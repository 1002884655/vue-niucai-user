<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="开奖历史">
      <div class="PageContainer">
        <!-- 开奖信息 -->
        <div class="PrizeInfo" v-if="PageData !== null">
          <div class="flex-h">
            <div class="Icon">
              <img src="../../../assets/img/icon4.png" class="centerLabel cover" alt="">
            </div>
            <span>大乐透</span>
            <div class="flex-item">
              <div class="Time">
                <span>开奖日期：{{PageData.openingDate}}</span>
                <span>第{{PageData.issueNo}}期</span>
              </div>
              <ul class="Num">
                <li v-for="(item, index) in PageData.firstResult.split(',')" :key="`First-${index}`">{{item}}</li>
                <li v-for="(item, index) in PageData.secondResult.split(',')" :key="`Second-${index}`" class="active">{{item}}</li>
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
        <div class="ResList">
          <span>本期中奖详情</span>
          <ul>
            <li class="flex-h">
              <span class="flex-item">奖项</span>
              <span class="flex-item">中奖注数（注）</span>
              <span class="flex-item">单注奖金（牛币）</span>
            </li>
            <li class="flex-h" v-for="(item, index) in PageData.detailList" :key="index">
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
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapIndexState } = createNamespacedHelpers('index')
export default {
  name: '',
  data () {
    return {
      PageData: null
    }
  },
  computed: {
    ...mapIndexState({
      LotteryRes: x => x.LotteryRes // 数字彩开奖结果列表
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
    Init () { // 初始化
      let SerialNo = this.$route.query.serialNo
      let IssueNo = this.$route.query.issueNo
      this.LotteryRes.map((item) => {
        if (item.serialNo === SerialNo && item.issueNo === IssueNo) {
          this.PageData = { ...item }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
