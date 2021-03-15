<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="篮球开奖">
      <div class="PageContainer flex-v">
        <!-- 开奖日期 -->
        <!-- <div class="Time" v-if="NewstRes !== null">
          <div class="Icon">
            <img src="../../../assets/img/icon6.png" class="centerLabel contain" alt="">
          </div>
          <span>{{ToolClass.FormatDate(NewstRes.createDate, 'yyyy-MM-dd')}}</span>
          <span>{{NewstRes.matchWeek}}</span>
        </div> -->

        <div class="flex-item">
          <div>

            <!-- nav -->
            <TabSwiper :List="NavList" :InfiniteStatus="true" @Refresh="Refresh" @Infinite="Infinite" @Change="TabChange">

              <!-- 胜负 -->
              <div slot="SwiperItem-1" class="Item">
                <ul>
                  <li v-for="(item, index) in LotterySportRes" :key="index" v-if="item.playOdds['bst-wl'] !== undefined" class="flex-h">
                    <div class="From">
                      <span>{{item.leagueName}}</span>
                      <span>{{item.matchWeek}}</span>
                    </div>
                    <div class="flex-item flex-h">
                      <div class="flex-item">
                        <span>{{item.awayTeamName}}</span>
                      </div>
                      <div class="flex-item">
                        <span class="Small">{{!item.playOdds['bst-wl'][0].isWinning ? '胜' : '负'}}</span>
                        <span class="Big">{{item.wholeScore}}</span>
                      </div>
                      <div class="flex-item">
                        <span>{{item.homeTeamName}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div>
                  <router-link :to="{ name: 'LanQiu' }">竞彩篮球投注</router-link>
                </div>
              </div>

              <!-- 让分胜负 -->
              <div slot="SwiperItem-2" class="Item">
                <ul>
                  <li v-for="(item, index) in LotterySportRes" :key="index" v-if="item.playOdds['bst-wls'] !== undefined" class="flex-h">
                    <div class="From">
                      <span>{{item.leagueName}}</span>
                      <span>{{item.matchWeek}}</span>
                    </div>
                    <div class="flex-item flex-h">
                      <div class="flex-item">
                        <span>{{item.awayTeamName}}</span>
                      </div>
                      <div class="flex-item">
                        <span class="Small">{{!item.playOdds['bst-wls'][0].isWinning ? `让胜（${item.spreadPoints}）` : `让负（${item.spreadPoints}）`}}</span>
                        <span class="Big">{{item.wholeScore}}</span>
                      </div>
                      <div class="flex-item">
                        <span>{{item.homeTeamName}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div>
                  <router-link :to="{ name: 'LanQiu' }">竞彩篮球投注</router-link>
                </div>
              </div>

              <!-- 胜分差 -->
              <div slot="SwiperItem-3" class="Item">
                <ul>
                  <li v-for="(item, index) in LotterySportRes" :key="index" v-if="item.playOdds['bst-points'] !== undefined" class="flex-h">
                    <div class="From">
                      <span>{{item.leagueName}}</span>
                      <span>{{item.matchWeek}}</span>
                    </div>
                    <div class="flex-item flex-h">
                      <div class="flex-item">
                        <span>{{item.awayTeamName}}</span>
                      </div>
                      <div class="flex-item">
                        <span class="Small" v-for="(subItem, subIndex) in item.playOdds['bst-points']" :key="subIndex" v-if="subItem.isWinning">{{subItem.name.substring(0, 1) === '胜' ? '负' : '胜'}}{{subItem.name.substring(1)}}</span>
                        <span class="Big">{{item.wholeScore}}</span>
                      </div>
                      <div class="flex-item">
                        <span>{{item.homeTeamName}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div>
                  <router-link :to="{ name: 'LanQiu' }">竞彩篮球投注</router-link>
                </div>
              </div>

              <!-- 大小分 -->
              <div slot="SwiperItem-4" class="Item">
                <ul>
                  <li v-for="(item, index) in LotterySportRes" :key="index" v-if="item.playOdds['bst-score'] !== undefined" class="flex-h">
                    <div class="From">
                      <span>{{item.leagueName}}</span>
                      <span>{{item.matchWeek}}</span>
                    </div>
                    <div class="flex-item flex-h">
                      <div class="flex-item">
                        <span>{{item.awayTeamName}}</span>
                      </div>
                      <div class="flex-item">
                        <span class="Small" v-for="(subItem, subIndex) in item.playOdds['bst-score']" :key="subIndex" v-if="subItem.isWinning">{{subItem.name}}({{item.presetPoints}})</span>
                        <span class="Big">{{item.wholeScore}}</span>
                      </div>
                      <div class="flex-item">
                        <span>{{item.homeTeamName}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div>
                  <router-link :to="{ name: 'LanQiu' }">竞彩篮球投注</router-link>
                </div>
              </div>

            </TabSwiper>

          </div>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
import TabSwiper from '../../../components/common/TabSwiper'
const { mapState: mapIndexState, mapActions: mapIndexActions, mapMutations: mapIndexMutations } = createNamespacedHelpers('index')
export default {
  name: '',
  data () {
    return {
      PageData: {
        pageNum: 0,
        pageSize: 15
      },
      HasNextPage: true,
      DataLock: false,
      NewstRes: null,
      NavList: [ // nav数据
        { name: '胜负', id: 1 },
        { name: '让分胜负', id: 2 },
        { name: '胜分差', id: 3 },
        { name: '大小分', id: 4 }
      ]
    }
  },
  computed: {
    ...mapIndexState({
      LotterySportRes: x => x.LotterySportRes // 最新竞彩开奖结果列表
    })
  },
  components: {
    MainPageContainer,
    TabSwiper
  },
  created () {
    this.Init()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapIndexActions([
      'GetLotterySportRes'
    ]),
    ...mapIndexMutations([
      'EmptyLotterySportRes'
    ]),
    Init (done = () => { }) {
      this.EmptyLotterySportRes()
      this.PageData.pageNum = 0
      this.HasNextPage = true
    },
    ToGetLotterySportRes (done = () => { }, num = null) {
      if (!this.HasNextPage && this.DataLock) return
      this.DataLock = true
      if (num !== null) {
        this.PageData.pageNum += num
      }
      this.GetLotterySportRes({ queryData: { lotteryId: 'basketball', ...this.PageData } }).then((res) => {
        this.HasNextPage = res.data.data.pages > this.PageData.pageNum
        this.DataLock = false
        done()
      }).catch(() => {
        this.DataLock = false
        done()
      })
    },
    TabChange (e) { // nav切换

    },
    Refresh (e) { // 页面下拉刷新
      this.Init(e.done)
    },
    Infinite (e) { // 页面上拉加载
      if (this.HasNextPage && !this.DataLock) {
        this.ToGetLotterySportRes(e.done, 1)
      } else {
        e.done()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
