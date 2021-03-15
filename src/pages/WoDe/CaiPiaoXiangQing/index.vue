<template>
  <div class="Page CaiPiaoXiangQing">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="彩票详情">
      <div class="PageContainer" v-if="Detail !== null">
        <div class="Top">
          <div class="Type flex-h">
            <img src="../../../assets/img/icon2.png" v-if="Detail.betting.lotteryId === 'p5'" alt="">
            <img src="../../../assets/img/icon3.png" v-if="Detail.betting.lotteryId === 'football'" alt="">
            <img src="../../../assets/img/icon4.png" v-if="Detail.betting.lotteryId === 'lottery'" alt="">
            <img src="../../../assets/img/icon5.png" v-if="Detail.betting.lotteryId === 'double-color'" alt="">
            <img src="../../../assets/img/icon6.png" v-if="Detail.betting.lotteryId === 'basketball'" alt="">
            <img src="../../../assets/img/icon7.png" v-if="Detail.betting.lotteryId === 'p3'" alt="">
            <span>{{ToolClass.GetLotteryName(Detail.betting.lotteryId)}}</span>
            <div class="flex-item"></div>
            <span v-if="Detail.betting.lotteryId !== 'basketball' && Detail.betting.lotteryId !== 'football'">第{{Detail.betting.issueNo}}期</span>
          </div>
          <div class="Status flex-h">
            <div class="flex-item" v-if="Detail.betting.lotteryId !== 'basketball' && Detail.betting.lotteryId !== 'football'">
              <span>{{Detail.betting.winAmount || '-'}}</span>
              <span>中奖金额（牛币）</span>
            </div>
            <div class="flex-item" v-else>
              <span>{{Detail.betting.expectedEarning.substring(0, Detail.betting.expectedEarning.length - 1)}}</span>
              <span>预计奖金（牛币）</span>
            </div>
            <div class="flex-item">
              <span>{{ReturnStatus(Detail.betting)}}</span>
              <span>订单状态</span>
            </div>
            <div class="flex-item">
              <span><em>{{Detail.betting.totalPrice}}</em></span>
              <span>投注金额（牛币）</span>
            </div>
          </div>
        </div>

        <div class="Res" v-if="Detail.betting.isOpen">
          <div class="Title flex-h">
            <span class="flex-item">开奖结果</span>
          </div>
          <ul>
            <li v-for="(item, index) in Detail.prize.result.split(',')" :key="`First-${index}`">{{item}}</li>
            <li v-for="(item, index) in (Detail.prize.secondResult || '').split(',')" :key="`Sec-${index}`" :style="{display: item === '' ? 'none' : 'inline-block'}" class="active">{{item}}</li>
          </ul>
        </div>

        <div class="BettingInfo">
          <div class="Title flex-h">
            <span class="flex-item">投注信息</span>
            <span>{{Detail.betting.notesNum}}注{{Detail.betting.bettingTimes}}倍</span>
          </div>
          <div class="List flex-h" v-for="(item, index) in Detail.plan.itemList" :key="index" v-if="Detail.betting.lotteryId !== 'p5' && Detail.betting.lotteryId !== 'p3'">
            <span v-if="Detail.betting.lotteryId !== 'football' && Detail.betting.lotteryId !== 'basketball'">{{item.isDan ? '复式' : '单式'}}</span>
            <div class="flex-item">
              <ul v-if="Detail.betting.lotteryId === 'lottery' || Detail.betting.lotteryId === 'double-color'">
                <li v-for="(subItem, subIndex) in item.firstNums.split(',')" :key="`First-${subIndex}`">{{subItem}}</li>
                <li v-for="(subItem, subIndex) in item.secondNums.split(',')" :key="`Second-${subIndex}`" class="active">{{subItem}}</li>
              </ul>
              <div v-if="Detail.betting.lotteryId === 'football' || Detail.betting.lotteryId === 'basketball'">
                <span>{{item.matchWeek}} {{item.leagueName}} {{item.homeTeamName}} vs {{item.awayTeamName}}</span>
                <ul>
                  <li v-for="(subItem, subIndex) in item.detailList" :key="subIndex">{{subItem.ruleName}}({{subItem.odds}})</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="List flex-h" v-if="Detail.betting.lotteryId === 'p5'">
            <div class="flex-item">
              <ul v-for="(item, index) in P5Arr" :key="index" class="PaiLie">
                <li v-for="(subItem, subIndex) in item[0]" :key="`Wan-${subIndex}`">
                  <span>{{subItem}}</span>
                  <span>万</span>
                </li>
                <li v-for="(subItem, subIndex) in item[1]" :key="`Qian-${subIndex}`">
                  <span>{{subItem}}</span>
                  <span>千</span>
                </li>
                <li v-for="(subItem, subIndex) in item[2]" :key="`Bai-${subIndex}`">
                  <span>{{subItem}}</span>
                  <span>百</span>
                </li>
                <li v-for="(subItem, subIndex) in item[3]" :key="`Shi-${subIndex}`">
                  <span>{{subItem}}</span>
                  <span>十</span>
                </li>
                <li v-for="(subItem, subIndex) in item[4]" :key="`Ge-${subIndex}`">
                  <span>{{subItem}}</span>
                  <span>个</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="List flex-h" v-if="Detail.betting.lotteryId === 'p3'">
            <div class="flex-item">
              <ul v-for="(item, index) in P3Arr" :key="index" :class="[item.length <= 3 ? 'PaiLie' : '']">
                <li v-if="item.length <= 3" v-for="(subItem, subIndex) in item[0]" :key="`Bai-${subIndex}`">
                  <span>{{subItem}}</span>
                  <span>百</span>
                </li>
                <li v-if="item.length <= 3" v-for="(subItem, subIndex) in item[1]" :key="`Shi-${subIndex}`">
                  <span>{{subItem}}</span>
                  <span>十</span>
                </li>
                <li v-if="item.length <= 3" v-for="(subItem, subIndex) in item[2]" :key="`Ge-${subIndex}`">
                  <span>{{subItem}}</span>
                  <span>个</span>
                </li>
                <li v-else v-for="(subItem, subIndex) in item" :key="`Fu-${subIndex}`">{{subItem}}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="OrderInfo">
          <div class="Title flex-h">
            <span class="flex-item">订单详情</span>
          </div>
          <ul>
            <li class="flex-h">
              <span>店铺名称：</span>
              <div class="flex-item">
                <div>
                  <span>{{Detail.shop.name}}</span>
                </div>
              </div>
            </li>
            <li class="flex-h">
              <span>订单编号：</span>
              <div class="flex-item">
                <div>
                  <span>{{Detail.order.orderId}}</span>
                </div>
              </div>
            </li>
            <li class="flex-h">
              <span>下单时间：</span>
              <div class="flex-item">
                <div>
                  <span>{{ToolClass.FormatDate(Detail.order.createDate)}}</span>
                </div>
              </div>
            </li>
            <li class="flex-h" v-if="Detail.betting.isDrawn">
              <span>出票时间：</span>
              <div class="flex-item">
                <div>
                  <span>{{ToolClass.FormatDate(Detail.betting.drawnDate)}}</span>
                </div>
              </div>
            </li>
          </ul>
          <img :src="Detail.betting.lotteryPicture" width="100%" alt="">
        </div>

        <div class="Tips">
          <span>彩票中奖情况以实际出票为准，超时未出票，系统判定为出票失败，自动退还已投注的牛币，请关注出票情况。</span>
        </div>

        <div class="Btn">
          <!-- <a :href="`tel: ${Detail.shop.keeperPhone}`">联系店主</a> -->
          <router-link :to="{ name: 'index' }">返回首页</router-link>
        </div>
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
      P5Arr: [],
      P3Arr: [],
      Detail: null
    }
  },
  computed: {
    ...mapUserState({
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
      'GetBettingDetail'
    ]),
    Init () { // 初始化
      this.GetBettingDetail({ urlData: { id: this.$route.query.id } }).then((res) => {
        this.Detail = res.data.data
        if (this.Detail.betting.lotteryId === 'p5') {
          let P5Arr = []
          this.Detail.plan.itemList.map((item) => {
            let Arr = []
            Arr = item.firstNums.split(',')
            Arr.map((subItem, subIndex) => {
              Arr[subIndex] = subItem.split(' ')
            })
            P5Arr.push(Arr)
          })
          this.P5Arr = P5Arr
        }
        if (this.Detail.betting.lotteryId === 'p3') {
          let P3Arr = []
          this.Detail.plan.itemList.map((item) => {
            if (item.firstNums.split(',').length > 3) {
              P3Arr.push(item.firstNums.split(','))
            } else {
              let Arr = []
              Arr = item.firstNums.split(',')
              Arr.map((subItem, subIndex) => {
                Arr[subIndex] = subItem.split(' ')
              })
              P3Arr.push(Arr)
            }
          })
          this.P3Arr = P3Arr
          console.log(JSON.stringify(this.P3Arr))
        }
      })
    },
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
