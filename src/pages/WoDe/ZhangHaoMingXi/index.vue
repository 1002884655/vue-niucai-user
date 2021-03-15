<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="账号明细">
      <div class="PageContainer flex-v">
        <!-- 导航 -->
        <nav class="flex-h">
          <a class="flex-item" v-for="(item, index) in NavList" :key="index" :class="{'active': NavActiveId === item.id}" @click="CutNav(item, index)">{{item.name}}</a>
        </nav>

        <!-- 内容 -->
        <div class="flex-item">
          <div>
            <scroller :on-refresh="Refresh" :on-infinite="Infinite" :ref="`MyScroller`">
              <div class="Container">

                <!-- 全部 -->
                <ul>
                  <li v-for="(item, index) in AccountBill" :key="index" class="flex-h">
                    <div class="flex-item">
                      <span>{{item.feeType === 'BETTING' ? '投注' : '提现'}}</span>
                      <span>{{ToolClass.DateFormat(item.createDate)}}</span>
                    </div>
                    <span>{{item.amount  }}牛币</span>
                  </li>
                </ul>

              </div>
            </scroller>
          </div>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import MainPageContainer from '../../../components/common/MainPageContainer'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    let _that = this
    return {
      PageData: {
        pageNum: 0,
        pageSize: 10
      },
      PageList: [],
      Timer: null,
      HasNextPage: true,
      DataLock: false,
      NavActiveId: 1, // 导航选中id
      NavList: [ // 导航数据
        { name: '全部', id: 1 },
        { name: '投注', id: 2 },
        { name: '提现', id: 3 }
      ],
      SwiperOptions: {
        on: {
          transitionEnd () {
            _that.NavActiveId = _that.NavList[_that.MySwiper.activeIndex].id
          }
        }
      }
    }
  },
  computed: {
    MySwiper () {
      return this.$refs.MySwiper.swiper
    },
    ...mapUserState({
      UserInfo: x => x.UserInfo, // 用户信息
      AccountBill: x => x.AccountBill // 用户账户明细
    })
  },
  components: {
    swiper,
    swiperSlide,
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
      'GetAccountBill'
    ]),
    ...mapUserMutations([
      'EmptyAccountBill'
    ]),
    Init (done = () => { }) { // 初始化
      this.EmptyAccountBill()
      this.PageData.pageNum = 1
      this.HasNextPage = true
      this.DataLock = false
      this.ToGetPageList(done)
    },
    ToGetPageList (done = () => { }) { // 获取页面列表
      if (this.HasNextPage) {
        let QueryData = { ...this.PageData }
        if (this.NavActiveId - 0 === 2) {
          QueryData.feeType = 'BETTING'
        }
        if (this.NavActiveId - 0 === 3) {
          QueryData.feeType = 'CASH_OUT'
        }
        this.GetAccountBill({ urlData: { id: this.UserInfo.customerId }, queryData: { ...QueryData } }).then((res) => {
          this.HasNextPage = res.data.data.total > this.AccountBill.length
          done()
        }).catch(() => {
          done()
        })
      }
    },
    CutNav (item, index) { // 切换nav
      if (this.DataLock) return
      this.DataLock = true
      this.NavActiveId = item.id
      this.Init()
      this.DataLock = false
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
