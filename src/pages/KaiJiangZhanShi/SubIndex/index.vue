<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainTabBar="true" MainHeaderTitle="开奖展示" :MainTabBarActiveId="2">
      <div class="PageContainer">

        <scroller :on-refresh="Refresh">
          <div class="Container">
            <ul>

              <router-link tag="li" class="flex-h" v-for="(item, index) in NewstSportsRes" :key="`JingCai-${index}`" :to="{ name: item.lotteryId === 'basketball' ? 'KaiJiangZhanShiLanQiu' : 'KaiJiangZhanShiZuQiu' }">
                <div class="Icon">
                  <img src="../../../assets/img/icon3.png" v-if="item.lotteryId === 'football'" class="centerLabel cover" alt="">
                  <img src="../../../assets/img/icon6.png" v-else class="centerLabel cover" alt="">
                </div>
                <span>{{item.lotteryId === 'basketball' ? '篮球' : '足球'}}</span>
                <div class="flex-item">
                  <div>
                    <span>{{item.lotteryId === 'basketball' ? '客队 VS 主队' : '主队 VS 客队'}}</span>
                    <span>{{item.matchDate}}</span>
                  </div>
                  <div class="Res">
                    <span v-if="item.lotteryId === 'football'">{{item.homeTeamName}}<em>{{item.wholeScore}}</em>{{item.awayTeamName}}</span>
                    <span v-else>{{item.awayTeamName}}<em>{{item.wholeScore}}</em>{{item.homeTeamName}}</span>
                  </div>
                </div>
                <i class="iconfont iconjiantouright"></i>
              </router-link>

              <router-link tag="li" class="flex-h" v-for="(item, index) in NewstLotteryRes" :key="`ShuZiCai-${index}`" :to="{ name: item.lotteryId === 'double-color' ? 'KaiJiangZhanShiShuangSeQiu' : item.lotteryId === 'lottery' ? 'KaiJiangZhanShiDaLeTou' : item.lotteryId === 'p3' ? 'KaiJiangZhanShiPaiLie3' : 'KaiJiangZhanShiPaiLie5' }">
                <div class="Icon">
                  <img src="../../../assets/img/icon4.png" v-if="item.lotteryId === 'lottery'" class="centerLabel cover" alt="">
                  <img src="../../../assets/img/icon5.png" v-if="item.lotteryId === 'double-color'" class="centerLabel cover" alt="">
                  <img src="../../../assets/img/icon7.png" v-if="item.lotteryId === 'p3'" class="centerLabel cover" alt="">
                  <img src="../../../assets/img/icon2.png" v-if="item.lotteryId === 'p5'" class="centerLabel cover" alt="">
                </div>
                <span>{{item.lotteryId === 'double-color' ? '双色球' : item.lotteryId === 'lottery' ? '大乐透' : item.lotteryId === 'p3' ? '排列3' : '排列5'}}</span>
                <div class="flex-item Small">
                  <div>
                    <span>开奖日期：{{item.openingDate}} 第{{item.issueNo}}期</span>
                  </div>
                  <div class="Num" v-if="item.lotteryId === 'lottery' || item.lotteryId === 'double-color'">
                    <span v-for="(subItem, subIndex) in item.firstResult.split(',')" :key="`First-${subIndex}`">{{subItem}}</span>
                    <span class="active" v-for="(subItem, subIndex) in item.secondResult.split(',')" :key="`Second-${subIndex}`">{{subItem}}</span>
                  </div>
                  <div class="Num" v-if="item.lotteryId === 'p3' || item.lotteryId === 'p5'">
                    <span v-for="(subItem, subIndex) in item.result.split(',')" :key="`Res-${subIndex}`">{{subItem}}</span>
                  </div>
                </div>
                <i class="iconfont iconjiantouright"></i>
              </router-link>

            </ul>
          </div>
        </scroller>

      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapIndexState, mapActions: mapIndexActions } = createNamespacedHelpers('index')
export default {
  name: '',
  data () {
    return {
      ExitAppStatus: false
    }
  },
  computed: {
    ...mapIndexState({
      NewstLotteryRes: x => x.NewstLotteryRes, // 最新数字彩开奖结果列表
      NewstSportsRes: x => x.NewstSportsRes // 最新竞彩开奖结果列表
    })
  },
  components: {
    MainPageContainer
  },
  created () {
    this.Init()
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
    ...mapIndexActions([
      'GetNewstSportsRes',
      'GetNewstLotteryRes'
    ]),
    RouterBack () {
      if (this.ExitAppStatus) {
        window.js2native.closePage()
      } else {
        this.Toast('再按一次退出应用')
        this.ExitAppStatus = true
      }
    },
    Init (done = () => { }) {
      this.GetNewstSportsRes().then(() => {
        done()
      }).catch(() => {
        done()
      })
      this.GetNewstLotteryRes().then(() => {
        done()
      }).catch(() => {
        done()
      })
    },
    Refresh (done) { // 页面下拉刷新
      this.Init(done)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
