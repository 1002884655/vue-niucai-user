<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="手机号码">
      <div class="PageContainer">
        <ul>
          <li class="flex-h">
            <i class="iconfont iconshouji"></i>
            <div class="flex-item">
              <div>
                <input type="number" placeholder="请输入您的手机号码" v-model="Phone">
              </div>
            </div>
          </li>
          <li class="flex-h">
            <i class="iconfont iconmima"></i>
            <div class="flex-item">
              <div>
                <input type="number" placeholder="请输入验证码" v-model="Code">
              </div>
            </div>
            <a v-if="TimeNum === 60" @click="GetCode">获取验证码</a>
            <span v-else>{{TimeNum > 9 ? TimeNum : `0${TimeNum}`}}s后重新获取</span>
          </li>
        </ul>
        <div class="Btn">
          <a @click="BindPhone">立即绑定</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      Phone: '',
      Code: '',
      DataLock: false,
      Timer: null,
      TimeNum: 60
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    })
  },
  components: {
    MainPageContainer
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      'EditUserInfo'
    ]),
    ...mapUserActions([
      'GetRegPhoneCode',
      'UpdateUserInfo',
      'CheckRegPhoneCode'
    ]),
    BindPhone () { // 绑定手机
      if (this.DataLock) return
      this.DataLock = true
      this.CheckRegPhoneCode({ urlData: { phone: this.Phone }, queryData: { captcha: this.Code } }).then((res) => {
        this.UpdateUserInfo({ urlData: { id: this.UserInfo.customerId }, data: { phone: this.Phone } }).then(() => {
          this.Toast('手机绑定成功')
          this.EditUserInfo({ name: 'phone', value: this.Phone })
          this.DataLock = false
          this.$router.go(-1)
        })
      })
    },
    GetCode () { // 获取手机验证码
      if (this.DataLock || this.TimeNum !== 60 || !this.IsPhone(this.Phone)) return
      this.DataLock = false
      window.clearInterval(this.Timer)
      this.GetRegPhoneCode({ urlData: { phone: this.Phone } }).then(() => {
        this.DataLock = false
        if (this.TimeNum === 60) {
          this.TimeNum -= 1
        }
        this.Timer = window.setInterval(() => {
          if (this.TimeNum) {
            this.TimeNum -= 1
          } else {
            window.clearInterval(this.Timer)
            this.TimeNum = 60
          }
        }, 1000)
      }).catch((res) => {
        this.Toast(res.data.message)
        this.DataLock = false
      })
    },
    IsPhone (str) { // 校验手机号
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      return !!myreg.test(str)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
