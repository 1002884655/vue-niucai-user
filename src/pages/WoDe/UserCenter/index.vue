<template>
  <div class="Page">
    <MainPageContainer @UserInfoChange="UserInfoChange" :ShowMainTabBar="true" :MainTabBarActiveId="3">
      <div class="PageContainer">
        <!-- 头像 & 背景 -->
        <div class="TopContainer">
          <div class="centerLabel">
            <div class="Icon">
              <img :src="avatar" class="centerLabel cover" alt="">
            </div>
            <router-link :to="{ name: 'SignIn' }" v-if="UserInfo === null">点击注册/登录</router-link>
            <span v-else>{{UserInfo.name}}</span>
            <span v-if="UserInfo !== null && UserInfo.account !== undefined" style="width: 80vw; margin-top: 0; line-height: 0.2rem;">账户余额：{{UserInfo.account.amount}} 牛币</span>
            <span v-if="UserInfo !== null && UserInfo.account !== undefined" style="width: 80vw; margin-top: 0; line-height: 0.2rem;">中奖金额：{{UserInfo.account.cash}} 牛币</span>
          </div>
        </div>

        <!-- 选项 -->
        <ul class="List">
          <router-link tag="li" v-for="(item, index) in UserTabList" :key="index" :to="{ name: item.router }" :class="{'LastBorder': index === UserTabList.length - 1 && (index + 1) % 2 !== 0}">
            <div class="flex-h">
              <div class="Icon">
                <img :src="item.img" class="centerLabel contain" alt="">
              </div>
              <div class="flex-item">
                <div>
                  <span>{{item.name}}</span>
                  <span>{{item.desc}}</span>
                </div>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      ExitAppStatus: false,
      UserTabList: [
        { name: '我的彩票', desc: '查看购买彩票详情', img: require('../../../assets/img/icon1.png'), router: 'WoDeCaiPiao' },
        { name: '账户明细', desc: '流水明细', img: require('../../../assets/img/icon10.png'), router: 'ZhangHaoMingXi' },
        // { name: '安全中心', desc: '用户设置', img: require('../../../assets/img/icon9.png'), router: 'AnQuanZhongXin' },
        { name: '个人设置', desc: '关于我们', img: require('../../../assets/img/icon8.png'), router: 'GeRenSheZhi' },
        { name: '提现', desc: '提取余额', img: require('../../../assets/img/tixian.png'), router: 'TiXian' },
        { name: '充值', desc: '快速充值', img: require('../../../assets/img/chongzhi.png'), router: 'ChongZhi' },
        { name: '下载二维码', desc: '分享好友', img: require('../../../assets/img/icon11.png'), router: 'XiaZaiErWeiMa' }
      ]
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    }),
    avatar () {
      return (this.UserInfo || {}).avatar || 'https://njcj.oss-cn-shanghai.aliyuncs.com/miniapp/upload/images/default_avatar.jpg'
    }
  },
  components: {
    MainPageContainer
  },
  created () {
  },
  mounted () {
    if (window.history && window.history.pushState) {
      this.ExitAppStatus = false
      window.history.pushState(null, null, document.URL)
      window.history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.RouterBack, false)
    }
    this.$nextTick(() => {
      this.GetCurrentUserInfo()
    })
  },
  destroyed () {
    window.removeEventListener('popstate', this.RouterBack, false)
  },
  methods: {
    ...mapUserActions([
      'GetCurrentUserInfo'
    ]),
    RouterBack () {
      if (this.ExitAppStatus) {
        window.js2native.closePage()
      } else {
        this.Toast('再按一次退出应用')
        this.ExitAppStatus = true
      }
    },
    UserInfoChange () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
