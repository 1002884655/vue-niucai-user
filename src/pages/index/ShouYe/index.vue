<template>
  <div class="Page">
    <MainPageContainer @UserInfoChange="Init" :ShowMainHeader="true" :ShowMainTabBar="true" MainHeaderTitle="首页" :MainTabBarActiveId="1">
      <div class="PageContainer">

        <div class="SafariLayer" v-if="ShowSafariLayer">
          <div class="flex-h">
            <div class="Logo">
              <img src="../../../assets/img/logo1.png" class="centerLabel contain" alt="">
            </div>
            <div class="flex-item">
              <span>添加到主屏幕</span>
              <span>牛彩</span>
            </div>
            <router-link :to="{ name: 'AddToScreen' }">添加教程</router-link>
          </div>
          <i class="iconfont iconguanbi" @click="EditSafariLayer(false)"></i>
        </div>

        <div class="Iframe flex-v" v-if="ShowIframe">
          <div class="Top">
            <a class="iconfont iconjiantouleft" @click="ShowIframe = false"></a>
            <span>{{IframeTitle}}</span>
          </div>
          <div class="flex-item">
            <div>
              <iframe :src="IframeSrc" frameborder="0"></iframe>
            </div>
          </div>
        </div>

        <!-- 背景 -->
        <div class="Bg"></div>

        <!-- 内容 -->
        <div class="Content">
          <scroller :on-refresh="Refresh" refreshLayerColor="#fff">
            <div class="Container">

              <!-- banner -->
              <div class="Banner">
                <div>
                  <Banner :list="bannerList" @Click="BannerClick"></Banner>
                </div>
              </div>

              <!-- 开奖信息提示 -->
              <div class="LotteryInfo">
                <div class="Title flex-h">
                  <span class="flex-item">开奖信息展示</span>
                  <router-link :to="{ name: 'KaiJiangZhanShi' }">
                    <span>查看更多</span>
                    <i class="iconfont iconjiantouright"></i>
                  </router-link>
                </div>
                <ul class="List">
                  <li v-for="(item, index) in NewstLotteryRes" :key="index">
                    <div class="Name">
                      <span>{{ToolClass.GetLotteryName(item.lotteryId)}}</span>
                      <span>{{item.issueNo}}期</span>
                    </div>
                    <div class="Num">
                      <span v-for="(subItem, subIndex) in item.result.split(',')" :key="subIndex" :class="{'active': item.secondResult !== null && subIndex > item.result.split(',').length - item.secondResult.split(',').length - 1}">{{subItem}}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- 彩票分类列表 -->
              <ul class="LotteryTypeList">
                <router-link tag="li" v-for="(item, index) in AllLotteryType" :key="index" :to="{ name: item.router }">
                  <div class="flex-h">
                    <div class="Icon">
                      <img v-if="item.icon !== ''" :src="require(`../../../assets/img/${item.icon}`)" class="centerLabel cover" alt="">
                    </div>
                    <div class="flex-item">
                      <span>{{ToolClass.GetLotteryName(item.lotteryId)}}</span>
                      <span>{{item.desc}}</span>
                    </div>
                  </div>
                </router-link>
              </ul>

            </div>
          </scroller>
        </div>

      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import Banner from '../../../components/index/Banner'
import { mapState, mapActions, mapMutations, createNamespacedHelpers } from 'vuex'
const { mapState: mapIndexState, mapActions: mapIndexActions, mapMutations: mapIndexMutations } = createNamespacedHelpers('index')
export default {
  name: 'index',
  data () {
    return {
      IframeSrc: null,
      ShowIframe: false,
      IframeTitle: '',
      ExitAppStatus: false,
      bannerList: [
        {
          image: 'https://niucai.oss-cn-beijing.aliyuncs.com/app/images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201101151720.png',
          link: null
        },
        {
          image: 'https://niucai.oss-cn-beijing.aliyuncs.com/app/images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201101151720.png',
          link: null
        }
      ]
    }
  },
  computed: {
    ...mapState({
      FirstComming: x => x.FirstComming,
      ShowSafariLayer: x => x.ShowSafariLayer,
      AllLotteryType: x => x.AllLotteryType // 所有彩种类型
    }),
    ...mapIndexState({
      NewstLotteryRes: x => x.NewstLotteryRes // 最新数字彩开奖结果列表
    })
  },
  components: {
    MainPageContainer,
    Banner
  },
  created () {
    if (this.FirstComming) {
      this.EditFirstComming(false)
      let ua = navigator.userAgent.toLowerCase()
      if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 &&
        ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 &&
        ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
        this.EditSafariLayer(true)
      }
    }
  },
  mounted () {
    if (window.history && window.history.pushState) {
      this.ExitAppStatus = false
      window.history.pushState(null, null, document.URL)
      window.history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.RouterBack, false)
    }
    this.$nextTick(() => {
    })
  },
  destroyed () {
    window.removeEventListener('popstate', this.RouterBack, false)
  },
  methods: {
    ...mapMutations([
      'EditSafariLayer',
      'EditFirstComming'
    ]),
    ...mapActions([
      'GetAllLotteryType'
    ]),
    ...mapIndexActions([
      'GetBanner',
      'GetLotteryRes',
      'GetNewstLotteryRes'
    ]),
    ...mapIndexMutations([
      'EmptyBanner'
    ]),
    BannerClick (e) {
      this.IframeTitle = e.title || '活动'
      this.IframeSrc = e.link || null
      this.ShowIframe = true
    },
    RouterBack () {
      if (this.ExitAppStatus) {
        window.js2native.closePage()
      } else {
        this.Toast('再按一次退出应用')
        this.ExitAppStatus = true
      }
    },
    Init (done = () => { }) { // 初始化
      this.EmptyBanner()
      this.GetBanner({ queryData: { pageNum: 1, pageSize: 10, status: 1, adType: 'app-index-banner' } }).then(() => { // 获取banner
        this.GetNewstLotteryRes().then(() => { // 获取最新数字彩开奖结果列表
          done()
        })
        // this.GetLotteryRes({ queryData: { pageNum: 1, pageSize: 10 } })
        this.GetAllLotteryType({ queryData: { pageNum: 1, pageSize: 1000 } })
      })
    },
    Refresh (done) { // 页面下拉刷新
      this.Init(done) // 初始化
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
