<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="我的彩票">
      <div class="PageContainer">
        <scroller :on-refresh="Refresh" :on-infinite="Infinite" ref="MyScroller">
          <div class="Container">
            <ul>
              <router-link tag="li" :to="{ name: 'CaiPiaoXiangQing', query: { id: item.bettingId } }" v-for="(item, index) in UserBettingList" :key="index">
                <div class="Time">
                  <span>下单时间：{{ToolClass.FormatDate(item.createDate)}}</span>
                  <span v-if="item.lotteryId !== 'football' && item.lotteryId !== 'basketball'">{{item.issueNo}}期</span>
                </div>
                <div class="flex-h">
                  <div class="Icon">
                    <img v-if="item.lotteryId === 'football'" src="../../../assets/img/icon3.png" class="centerLabel cover" alt="">
                    <img v-if="item.lotteryId === 'basketball'" src="../../../assets/img/icon6.png" class="centerLabel cover" alt="">
                    <img v-if="item.lotteryId === 'lottery'" src="../../../assets/img/icon4.png" class="centerLabel cover" alt="">
                    <img v-if="item.lotteryId === 'double-color'" src="../../../assets/img/icon5.png" class="centerLabel cover" alt="">
                    <img v-if="item.lotteryId === 'p3'" src="../../../assets/img/icon7.png" class="centerLabel cover" alt="">
                    <img v-if="item.lotteryId === 'p5'" src="../../../assets/img/icon2.png" class="centerLabel cover" alt="">
                  </div>
                  <div class="flex-item">
                    <span>{{item.lotteryName}}</span>
                    <span>{{item.totalPrice  }}牛币</span>
                  </div>
                </div>
                <div class="flex-h">
                  <div class="flex-item">
                    <!-- <span>订单号：{{item.orderId || null}}</span> -->
                  </div>
                  <span>{{ReturnStatus(item)}}</span>
                </div>
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
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      PageData: {
        pageNum: 0,
        pageSize: 10
      },
      Timer: null,
      HasNextPage: true,
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      UserBettingList: x => x.UserBettingList // 用户投注列表
    })
  },
  components: {
    MainPageContainer
  },
  created () {
    this.Init()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'GetUserBettingList'
    ]),
    ...mapUserMutations([
      'EmptyUserBettingList'
    ]),
    ReturnStatus (item) {
      if (!item.isDrawn) {
        if (item.status - 0 === 2) {
          return '出票失败'
        } else {
          return '未出票'
        }
      }
      if (!item.isOpen) {
        // return '未开奖'
        return '已出票'
      }
      if (!item.isWinning) {
        return '未中奖'
      }
      return '已中奖'
    },
    Init (done = () => { }) { // 初始化
      this.EmptyUserBettingList()
      this.PageData.pageNum = 1
      this.HasNextPage = true
      this.DataLock = false
      this.ToGetPageList(done)
    },
    ToGetPageList (done = () => { }) { // 获取列表
      if (this.HasNextPage) {
        this.GetUserBettingList({ queryData: { ...this.PageData } }).then((res) => {
          this.HasNextPage = res.data.data.total > this.UserBettingList.length
          done()
        }).catch((res) => {
          done()
        })
      }
    },
    Infinite (done) { // 上拉加载
      this.Timer = window.setTimeout(() => {
        if (this.HasNextPage) {
          this.PageData.pageNum += 1
          this.ToGetPageList(done)
        } else {
          this.$refs.MyScroller.finishInfinite(true)
        }
      }, 1000)
    },
    Refresh (done) { // 页面下拉刷新
      if (!this.DataLock) {
        this.Init(done)
      } else {
        done()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
