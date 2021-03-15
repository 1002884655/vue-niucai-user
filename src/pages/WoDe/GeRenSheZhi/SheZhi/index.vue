<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="个人设置">
      <div class="PageContainer">
        <ul>
          <router-link tag="li" class="flex-h" :to="{name: 'ZhangHuSheZhi'}">
            <span class="flex-item">账户设置</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link>
          <router-link v-if="UserInfo !== null" tag="li" class="flex-h" :to="{name: 'EditTiXianMiMa'}">
            <span class="flex-item">提现密码</span>
            <span>{{UserInfo.cashPass === null ? '未设置' : '已设置'}}</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link>
          <router-link v-if="UserInfo !== null" tag="li" class="flex-h" :to="{name: 'BangDingZhiFuBao'}">
            <span class="flex-item">绑定支付宝</span>
            <span>{{UserInfo.alipayUser === null ? '未绑定' : '已绑定'}}</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link>
          <router-link tag="li" class="flex-h" :to="{name: 'GuanYuWoMen'}">
            <span class="flex-item">关于我们</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link>
        </ul>
        <a @click="SignOut">退出登录</a>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
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
    ...mapUserMutations([
      'EmptyUserInfo'
    ]),
    SignOut () { // 登出
      this.EmptyUserInfo()
      window.localStorage.removeItem('niucaiusername')
      window.localStorage.removeItem('niucaiuserpassword')
      this.$router.push({ name: 'SignIn' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
