<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="大乐透开奖">
      <div class="PageContainer">
        <!-- nav -->
        <TabSwiper :List="NavList" @Refresh="Refresh" @Change="TabChange">

          <!-- 最新开奖 -->
          <div slot="SwiperItem-1" class="Item">

            <!-- 开奖信息 -->
            <div class="PrizeInfo" v-if="LotteryRes.length">
              <div class="flex-h">
                <div class="Icon">
                  <img src="../../../assets/img/icon4.png" class="centerLabel cover" alt="">
                </div>
                <span>大乐透</span>
                <div class="flex-item">
                  <div class="Time">
                    <span>开奖日期：{{LotteryRes[0].openingDate}}</span>
                    <span>第{{LotteryRes[0].issueNo}}期</span>
                  </div>
                  <ul class="Num">
                    <li v-for="(item, index) in LotteryRes[0].firstResult.split(',')" :key="`First-${index}`">{{item}}</li>
                    <li v-for="(item, index) in LotteryRes[0].secondResult.split(',')" :key="`Second-${index}`" class="active">{{item}}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 销售信息 -->
            <!-- <div class="SaleInfo flex-h">
              <div class="flex-item">
                <span>本期销售：</span>
                <span>346015916牛币</span>
              </div>
              <div class="flex-item">
                <span>奖池滚存：</span>
                <span>34623015916牛币</span>
              </div>
            </div> -->

            <!-- 中奖详情 -->
            <div class="ResList" v-if="LotteryRes.length">
              <span>本期中奖详情</span>
              <ul>
                <li class="flex-h">
                  <span class="flex-item">奖项</span>
                  <span class="flex-item">中奖注数（注）</span>
                  <span class="flex-item">单注奖金（牛币）</span>
                </li>
                <li class="flex-h" v-for="(item, index) in LotteryRes[0].detailList" :key="index">
                  <span class="flex-item">{{item.level}}</span>
                  <span class="flex-item">{{item.piece}}</span>
                  <span class="flex-item">{{item.money}}</span>
                </li>
              </ul>
              <div class="Btn">
                <router-link :to="{ name: 'DaLeTou' }">大乐透投注</router-link>
              </div>
            </div>

          </div>

          <!-- 走势图 -->
          <div slot="SwiperItem-2" class="Item">走势图</div>

          <!-- 开奖历史 -->
          <div slot="SwiperItem-3" class="Item">
            <ul class="HistoryList">
              <router-link tag="li" v-for="(item, index) in LotteryRes" :key="index" :to="{ name: 'DaLeTouXiangQing', query: { serialNo: item.serialNo, lotteryId: 'lottery', issueNo: item.issueNo } }" class="flex-h">
                <div class="Icon">
                  <img src="../../../assets/img/icon4.png" class="centerLabel cover" alt="">
                </div>
                <span>大乐透</span>
                <div class="flex-item">
                  <div class="Time">
                    <span>开奖日期：{{item.openingDate}}</span>
                    <span>第{{item.issueNo}}期</span>
                  </div>
                  <ul class="Num">
                    <li v-for="(subItem, subIndex) in item.firstResult.split(',')" :key="`First-${subIndex}`">{{subItem}}</li>
                    <li v-for="(subItem, subIndex) in item.secondResult.split(',')" :key="`Second-${subIndex}`" class="active">{{subItem}}</li>
                  </ul>
                </div>
              </router-link>
            </ul>
          </div>

        </TabSwiper>
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
      NavList: [ // nav数据
        { name: '最新开奖', id: 1 },
        // { name: '走势图', id: 2 },
        { name: '开奖历史', id: 3 }
      ],
      PageData: {
        pageNum: 1,
        pageSize: 100
      },
      Total: 1,
      DataLock: false
    }
  },
  computed: {
    ...mapIndexState({
      LotteryRes: x => x.LotteryRes // 数字彩开奖结果列表
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
      'GetLotteryRes'
    ]),
    ...mapIndexMutations([
      'EmptyLotteryRes'
    ]),
    Init () {
      this.EmptyLotteryRes()
      this.ToGetLotteryRes()
    },
    TabChange (e) { // nav切换

    },
    ToGetLotteryRes (done = () => { }) { // 获取开奖列表
      if (this.DataLock || this.LotteryRes.length >= this.Total) {
        done()
      } else {
        this.DataLock = true
        this.GetLotteryRes({ queryData: { ...this.PageData, lotteryId: 'lottery' } }).then((res) => {
          this.Total = res.data.data.total > 1 ? res.data.data.total : this.LotteryRes.length
          this.DataLock = false
          done()
        }).catch((res) => {
          this.Toast(res.data.message)
          this.DataLock = false
          done()
        })
      }
    },
    Refresh (e) { // 页面下拉刷新
      this.ToGetLotteryRes(e.done())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
