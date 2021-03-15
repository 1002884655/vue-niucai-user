<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="设置提现密码" @UserInfoChange="Init">
      <div class="PageContainer">
        <div class="Form">
          <input type="password" placeholder="请输入登录密码" v-model="LoginPassword" @input="LoginPassword = LoginPassword.substring(0, 12)">
        </div>
        <div class="Form">
          <input type="password" placeholder="请输入2~12个字符" v-model="Password" @input="Password = Password.substring(0, 12)">
        </div>
        <div class="Form">
          <input type="password" placeholder="请确认您的密码" v-model="PasswordAgain" @input="PasswordAgain = PasswordAgain.substring(0, 12)">
        </div>
        <div class="Btn">
          <a @click="EditMiMa">确认</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import md5 from 'js-md5'
import MainPageContainer from '../../../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      LoginPassword: '',
      Password: '',
      PasswordAgain: '',
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
      'UpdateUserInfo'
    ]),
    Init () {
    },
    EditMiMa () {
      if (this.DataLock || this.Password === '' || this.PasswordAgain === '' || (this.UserInfo.cashPass !== null && this.LoginPassword === '')) return
      this.DataLock = true
      if (this.LoginPassword === '') {
        this.Toast('登录密码不能为空')
        this.DataLock = false
        return false
      }
      if (this.Password !== this.PasswordAgain) {
        this.Toast('新密码与确认密码不一致')
        this.DataLock = false
        return false
      }
      this.UpdateUserInfo({ urlData: { id: this.UserInfo.customerId }, data: { cashPass: md5(this.Password), loginPass: md5(this.LoginPassword) } }).then(() => {
        this.Toast('提现密码设置成功')
        this.EditUserInfo({ name: 'cashPass', value: '1' })
        this.DataLock = false
        this.$router.go(-1)
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
