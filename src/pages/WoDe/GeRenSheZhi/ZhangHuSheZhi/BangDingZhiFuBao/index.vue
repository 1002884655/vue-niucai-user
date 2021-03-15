<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="绑定支付宝" @UserInfoChange="Init">
      <div class="PageContainer">
        <div class="Form">
          <div class="flex-h">
            <span>支付宝账号</span>
            <div class="flex-item">
              <input type="text" placeholder="请输入支付宝账号" v-model="AliAccount">
            </div>
          </div>
          <div class="flex-h">
            <span>真实姓名</span>
            <div class="flex-item">
              <input type="text" placeholder="请输入真实姓名" v-model="RealName">
            </div>
          </div>
        </div>
        <div class="Btn">
          <a @click="ToBindIdCard">确认</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      AliAccount: '',
      RealName: '',
      DataLock: false
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
      'UpdateUserInfo',
      'NewBindAliPay'
    ]),
    Init () {
      this.AliAccount = (this.UserInfo || {}).alipayUser
      this.RealName = (this.UserInfo || {}).realName
    },
    ToBindIdCard () {
      if (this.DataLock) return
      this.DataLock = true
      if (this.AliAccount === '') {
        this.Toast('支付宝账号不能为空')
        this.DataLock = false
        return false
      }
      this.NewBindAliPay({ urlData: { id: this.UserInfo.customerId }, data: { loginId: this.AliAccount, realName: this.RealName } }).then(() => {
        this.UpdateUserInfo({ urlData: { id: this.UserInfo.customerId }, data: { alipayUser: this.AliAccount, realName: this.RealName } }).then(() => {
          this.Toast('绑定支付宝成功')
          this.EditUserInfo({ name: 'alipayUser', value: this.AliAccount }, { name: 'realName', value: this.RealName })
          this.DataLock = false
          this.$router.push({ name: 'WoDe' })
        }).catch((res) => {
          this.Toast(res.data.message)
          this.DataLock = false
        })
      }).catch((res) => {
        this.Toast(res.data.message)
        this.DataLock = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
