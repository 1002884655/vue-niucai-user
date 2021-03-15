<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="安全中心">
      <div class="PageContainer">
        <ul v-if="UserInfo !== null">
          <!-- <router-link tag="li" :to="{ name: 'YaoQingZhuCe' }" class="flex-h">
            <span class="flex-item">邀请注册</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link>
          <li class="flex-h">
            <span class="flex-item">绑定微信</span>
            <i class="iconfont iconjinggao"></i>
            <span>未绑定</span>
            <i class="iconfont iconjiantouright"></i>
          </li> -->
          <li class="flex-h">
            <span class="flex-item">绑定支付宝</span>
            <i class="iconfont iconjinggao"></i>
            <span>未绑定</span>
            <i class="iconfont iconjiantouright"></i>
          </li>
          <router-link tag="li" :to="{ name: 'BangDingShouJi' }" class="flex-h">
            <span class="flex-item">绑定手机号</span>
            <i class="iconfont iconjinggao" v-if="UserInfo.phone === '' || UserInfo.phone === null"></i>
            <span>{{UserInfo.phone || '未绑定'}}</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link>
        </ul>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
