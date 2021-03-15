<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="充值" @UserInfoChange="Init">
      <div class="PageContainer">
        <span v-if="UserInfo !== null && UserInfo.account !== undefined">当前账户余额：{{UserInfo.account.amount || 0 }} 牛币</span>
        <div class="Form">
          <span>￥</span>
          <input style="width: calc(100% - 24px); display: inline-block;" type="number" placeholder="请输入充值金额" v-model="rmb">
        </div>
        <div>
          <span class="tip">当前充值: {{Amount}} 牛币</span><br>
          <span class="tip">充值金额不能低于 ￥1.00元 </span><br>
          <span class="tip">1人民币=100牛币 且 充值金额不能用于提现</span><br>
        </div>
        <div class="Btn">
          <a @click="ToPayForAli">确定</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MainPageContainer from '../../../components/common/MainPageContainer'

const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      rmb: '',
      Amount: '0',
      Password: '',
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    })
  },
  watch: {
    rmb (newval) {
      this.Amount = newval * 100
    }
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
      'CashOut',
      'AliPay'
    ]),
    Init () {
    },
    ToPayForAli () {
      if (this.DataLock) return
      if (this.Amount === '') {
        this.Toast('充值牛币数量不能为空')
        return false
      }
      if (this.Amount - 0 < 100) {
        this.Toast('充值牛币数量不能低于100')
        return false
      }
      this.DataLock = true
      this.AliPay({ queryData: { amount: this.Amount - 0, returnURL: `${window.location.origin}/#/WoDe/ChongZhiZhuangTai`, token: window.localStorage.Jwt } }).then((res) => {
        this.DataLock = false
        if (this.$route.query.from) {
          window.localStorage.niucaichongzhifrom = this.$route.query.from
        } else {
          window.localStorage.niucaichongzhifrom = null
        }
        window.location.href = res.data.data.payUrl
      }).catch((res) => {
        this.DataLock = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";

.tip {
  display: inline-block;
  color: #999;
  padding: 0 0.15rem;
  text-indent: 0;
  margin-top: 0.1rem;
}
</style>
