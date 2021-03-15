<template>
  <div class="Page">
    <MainPageContainer @UserInfoChange="Init" :ShowMainHeader="true" MainHeaderTitle="订单状态" :ShowMainHeaderRight="true" :MainHeaderRightText="`完成`" :MainHeaderRightClick="() => { $router.push({ name: 'index' }) }">
      <div class="PageContainer">
        <div class="centerLabel">
          <i class="iconfont iconshibai" v-if="OrderStatus === 'Error'"></i>
          <span v-if="OrderStatus === 'Error'">待支付</span>
          <i class="iconfont iconchenggong active" v-if="OrderStatus === 'Success'"></i>
          <span v-if="OrderStatus === 'Success'">投注成功</span>
          <!-- <a v-if="OrderStatus === 'Error'" :href="`/api/app/order/alipay/betting?orderId=${$route.query.id}&returlURL=${LocationOrigin}&token=${Jwt}&routerName=${$route.query.routerName}`">重新支付</a> -->
          <a @click="ReplaceLink({ name: 'index' })">返回首页</a>
          <a @click="ReplaceLink({ name: 'CaiPiaoXiangQing', query: { id: $route.query.bettingId } })">查看投注</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: 'index',
  data () {
    return {
      OrderStatus: null,
      LocationOrigin: encodeURIComponent(`${window.location.origin}/#/index/DingDanZhiFuZhuangTai?orderId=${this.$route.query.id}`),
      Jwt: window.localStorage.Jwt
    }
  },
  computed: {
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
    ...mapUserActions([
      'GetAliPayStatus'
    ]),
    Init () { // 初始化
      if (this.$route.query.orderId !== undefined) {
        this.GetAliPayStatus({ urlData: { id: this.$route.query.orderId } }).then((res) => {
          this.OrderStatus = res.data.data === 1 ? 'Success' : 'Error'
        })
      }
    },
    ReplaceLink (target) {
      this.$router.replace({ ...target })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
