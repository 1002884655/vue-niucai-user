<template>
  <div class="Page">
    <MainPageContainer @UserInfoChange="Init" :ShowMainHeader="true" MainHeaderTitle="订单状态" :ShowMainHeaderRight="true" :MainHeaderRightText="`完成`" :MainHeaderRightClick="() => { if (!DataLock) { $router.push({ name: From || 'index' }) } }">
      <div class="PageContainer">
        <div class="centerLabel">
          <i class="iconfont iconshibai" v-if="OrderStatus === 'Error'"></i>
          <span v-if="OrderStatus === 'Error'">待支付</span>
          <span v-if="OrderStatus === null && DataLock">支付结果查询中...</span>
          <i class="iconfont iconchenggong active" v-if="OrderStatus === 'Success'"></i>
          <span v-if="OrderStatus === 'Success'">支付成功</span>
          <router-link v-if="!DataLock" :to="{ name: From || 'index' }">完成</router-link>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'index',
  data () {
    return {
      DataLock: true,
      From: null,
      OrderStatus: null,
      Jwt: window.localStorage.Jwt,
      Timer: null
    }
  },
  computed: {
  },
  components: {
    MainPageContainer
  },
  created () {
    this.From = window.localStorage.niucaichongzhifrom === 'null' || window.localStorage.niucaichongzhifrom === undefined ? null : window.localStorage.niucaichongzhifrom
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'GetCurrentUserInfo',
      'GetAliPayStatus'
    ]),
    ...mapUserMutations([
      'UpdateUserInfo'
    ]),
    CheckOrder () {
      this.GetAliPayStatus({ urlData: { id: this.$route.query.orderId } }).then((res) => {
        if (res.data.data === 1) {
          window.clearTimeout(this.Timer)
          this.OrderStatus = 'Success'
          this.GetCurrentUserInfo().then(() => {
            this.DataLock = false
          }).catch(() => {
            this.DataLock = false
          })
        } else {
          this.Timer = window.setTimeout(() => {
            this.CheckOrder()
          }, 5000)
        }
      }).catch(() => {
        this.Timer = window.setTimeout(() => {
          this.CheckOrder()
        }, 5000)
      })
    },
    Init () { // 初始化
      if (this.$route.query.orderId !== undefined) {
        this.GetAliPayStatus({ urlData: { id: this.$route.query.orderId } }).then((res) => {
          this.CheckOrder()
        })
      } else {
        this.GetCurrentUserInfo().then(() => {
          this.DataLock = false
        }).catch(() => {
          this.DataLock = false
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
