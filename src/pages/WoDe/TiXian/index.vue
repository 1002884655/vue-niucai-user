<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="提现" @UserInfoChange="Init">
      <div class="PageContainer">
        <span v-if="UserInfo !== null && UserInfo.account !== undefined">当前可提现余额：{{(UserInfo.account.cash || 0) / 100 }} 元</span>
        <div class="Form">
          <input type="number" placeholder="请输入提现金额" v-model="Amount">
        </div>
        <span style="color: #999">提现金额不能低于1元，1元=100牛币</span>
        <span style="color: #999">未设置过提现密码？<router-link :to="{ name: 'EditTiXianMiMa' }">设置提现密码</router-link></span>
        <div class="Btn">
          <a @click="ToShowPasswordPopup">提现</a>
        </div>
      </div>
      <div class="PasswordPopup" v-if="ShowPasswordPopup">
        <div class="centerLabel">
          <div class="Input">
            <input type="password" placeholder="请输入提现密码" v-model="Password" @input="Password = Password.substring(0, 12)">
          </div>
          <div class="Bottom flex-h">
            <a class="flex-item" @click="ShowPasswordPopup = false">取消</a>
            <a class="flex-item" @click="ToCashOut">{{DataLock ? '正在提交...' : '确认'}}</a>
          </div>
        </div>
      </div>
      <div class="LoadingLayer" v-if="ShowLoading">
        <span class="centerLabel">申请中...</span>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import md5 from 'js-md5'
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      ShowLoading: false,
      ShowPasswordPopup: false,
      Amount: '',
      Password: '',
      DataLock: false,
      ShowDialog: true
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
      'GetCurrentUserInfo',
      'CashOut'
    ]),
    Init () {
    },
    ToShowPasswordPopup () {
      if (this.Amount === '') {
        this.Toast('提现金额不能为空')
        return false
      }
      if (this.Amount - 0 < 1) {
        this.Toast('提现金额不能低于1元')
        return false
      }
      if (this.Amount - 0 > (this.UserInfo.account.cash - 0) / 100) {
        this.Toast('提现金额不能大于账户余额')
        return false
      }
      this.ShowPasswordPopup = true
    },
    ToCashOut () {
      if (this.Password === '') {
        this.Toast('提现密码不能为空')
        return false
      }
      if (this.DataLock) return
      this.DataLock = true
      this.ShowPasswordPopup = false
      this.ShowLoading = true
      this.CashOut({ data: { amount: this.Amount * 100, cashPass: md5(this.Password) } }).then((res) => {
        this.ShowLoading = false
        this.Toast('提现成功')
        this.GetCurrentUserInfo().then(() => {
          this.$router.push({ name: 'UserCenter' })
        })
        this.DataLock = false
      }).catch((res) => {
        this.ShowLoading = false
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
