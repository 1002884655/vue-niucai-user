<template>
  <div class="Page">
    <MainPageContainer :GoBack="() => { $router.replace({ name: 'index' }) }" :ShowMainHeader="true" :ShowMainTitleIcon="true" :ShowMainHeaderBack="true" :MainHeaderTitle="PageTitle" :MainTitleClick="MainTitleClick">
      <div class="PageContainer flex-v">

        <div class="HideNav" :class="{'active': ShowSelectTypeNav}">
          <div>
            <span>{{SelectTypeData.GuoGuan.Name}}</span>
            <nav>
              <a v-for="(item, index) in SelectTypeData.GuoGuan.List" :key="index" :class="{'active': SelectType === item.Id}" @click="CutSelectType(item)">{{item.Name}}</a>
            </nav>
            <span>{{SelectTypeData.DanGuan.Name}}</span>
            <nav>
              <a v-for="(item, index) in SelectTypeData.DanGuan.List" :key="index" :class="{'active': SelectType === item.Id}" @click="CutSelectType(item)">{{item.Name}}</a>
            </nav>
          </div>
        </div>

        <div class="Top">
          <div class="Time flex-h">
            <div class="Icon">
              <img src="../../../assets/img/icon3.png" class="centerLabel contain" alt="">
            </div>
            <div class="flex-item">
              <div>
                <span>{{TotalNum}}场比赛</span>
              </div>
            </div>
            <div class="flex-item">
              <div>
              </div>
            </div>
          </div>
        </div>

        <!-- 选区 -->
        <div class="flex-item">
          <div>
            <div>
              <div class="SelectArea">

                <span style="color: #999;display: block;text-align: center;line-height: 0.4rem;">{{NoData === null ? '正在请求比赛数据...' : NoData ? '暂无比赛' : ''}}</span>

                <!-- 过关-混合投注 -->
                <div class="GuoGuanHunHeTouZhu" v-if="SelectType === 1">
                  <ZuQiuGuoGuanHunHeTouZhu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></ZuQiuGuoGuanHunHeTouZhu>
                </div>

                <!-- 过关-胜平负 -->
                <div class="GuoGuanShengPingFu" v-if="SelectType === 2">
                  <ZuQiuGuoGuanShengPingFu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></ZuQiuGuoGuanShengPingFu>
                </div>

                <!-- 过关-半全场 -->
                <div class="GuoGuanBanQuanChang" v-if="SelectType === 3">
                  <ZuQiuGuoGuanBanQuanChang v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></ZuQiuGuoGuanBanQuanChang>
                </div>

                <!-- 过关-比分 -->
                <div class="GuoGuanBiFen" v-if="SelectType === 4">
                  <ZuQiuGuoGuanBiFen v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></ZuQiuGuoGuanBiFen>
                </div>

                <!-- 过关-进球数 -->
                <div class="GuoGuanJinQiuShu" v-if="SelectType === 5">
                  <ZuQiuGuoGuanJinQiuShu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></ZuQiuGuoGuanJinQiuShu>
                </div>

                <!-- 单关-胜平负 -->
                <div class="DanGuanShengPingFu" v-if="SelectType === 6">
                  <ZuQiuDanGuanShengPingFu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></ZuQiuDanGuanShengPingFu>
                </div>

                <!-- 单关-让分胜平负 -->
                <div class="DanGuanShengPingFu" v-if="SelectType === 10">
                  <ZuQiuDanGuanRangFenShengPingFu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></ZuQiuDanGuanRangFenShengPingFu>
                </div>

                <!-- 单关-半全场 -->
                <div class="DanGuanBanQuanChang" v-if="SelectType === 7">
                  <ZuQiuDanGuanBanQuanChang v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></ZuQiuDanGuanBanQuanChang>
                </div>

                <!-- 单关-比分 -->
                <div class="DanGuanBiFen" v-if="SelectType === 8">
                  <ZuQiuDanGuanBiFen v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></ZuQiuDanGuanBiFen>
                </div>

                <!-- 单关-进球数 -->
                <div class="DanGuanJinQiuShu" v-if="SelectType === 9">
                  <ZuQiuDanGuanJinQiuShu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></ZuQiuDanGuanJinQiuShu>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- 投注栏 -->
        <div class="Bottom flex-h">
          <a class="iconfont iconjian" @click="EmptyAllData"></a>
          <div class="flex-item"></div>
          <span>{{ResList.length ? `已选择${ResList.length}场比赛` : this.SelectType > 5 ? '单关至少选一场比赛' : '非单关至少选两场比赛'}}</span>
          <a class="Btn" @click="ToBetting">投注</a>
        </div>

      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { mapMutations, createNamespacedHelpers } from 'vuex'
const ZuQiuGuoGuanHunHeTouZhu = () => import('../../../components/index/ZuQiuGuoGuanHunHeTouZhu')
const ZuQiuGuoGuanShengPingFu = () => import('../../../components/index/ZuQiuGuoGuanShengPingFu')
const ZuQiuGuoGuanBanQuanChang = () => import('../../../components/index/ZuQiuGuoGuanBanQuanChang')
const ZuQiuGuoGuanBiFen = () => import('../../../components/index/ZuQiuGuoGuanBiFen')
const ZuQiuGuoGuanJinQiuShu = () => import('../../../components/index/ZuQiuGuoGuanJinQiuShu')
const ZuQiuDanGuanShengPingFu = () => import('../../../components/index/ZuQiuDanGuanShengPingFu')
const ZuQiuDanGuanRangFenShengPingFu = () => import('../../../components/index/ZuQiuDanGuanRangFenShengPingFu')
const ZuQiuDanGuanBanQuanChang = () => import('../../../components/index/ZuQiuDanGuanBanQuanChang')
const ZuQiuDanGuanBiFen = () => import('../../../components/index/ZuQiuDanGuanBiFen')
const ZuQiuDanGuanJinQiuShu = () => import('../../../components/index/ZuQiuDanGuanJinQiuShu')
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      TotalNum: 0,
      NoData: null,
      PageTitle: '',
      SelectTypeData: {
        GuoGuan: {
          Name: '过关',
          List: [
            { Name: '混合投注', Id: 1, Type: 'Mix', PassType: 'pass' },
            { Name: '胜平负', Id: 2, Type: 'ft-wdl', PassType: 'pass' },
            { Name: '半全场', Id: 3, Type: 'ft-double', PassType: 'pass' },
            { Name: '比分', Id: 4, Type: 'ft-score', PassType: 'pass' },
            { Name: '进球数', Id: 5, Type: 'ft-points', PassType: 'pass' }
          ]
        },
        DanGuan: {
          Name: '单关',
          List: [
            { Name: '胜平负', Id: 6, Type: 'ft-wdl', PassType: 'single' },
            { Name: '让分胜平负', Id: 10, Type: 'ft-wdls', PassType: 'single' },
            { Name: '半全场', Id: 7, Type: 'ft-double', PassType: 'single' },
            { Name: '比分', Id: 8, Type: 'ft-score', PassType: 'single' },
            { Name: '进球数', Id: 9, Type: 'ft-points', PassType: 'single' }
          ]
        }
      },
      ResList: [], // 投注结果数据
      MixData: [], // 混合数据
      SelectType: 1, // 选法，对应SelectTypeData中id值
      ShowSelectTypeNav: false // 显隐选法列表
    }
  },
  computed: {
    ...mapUserState({
    })
  },
  components: {
    MainPageContainer,
    ZuQiuGuoGuanHunHeTouZhu,
    ZuQiuGuoGuanShengPingFu,
    ZuQiuGuoGuanBanQuanChang,
    ZuQiuGuoGuanBiFen,
    ZuQiuGuoGuanJinQiuShu,
    ZuQiuDanGuanShengPingFu,
    ZuQiuDanGuanBanQuanChang,
    ZuQiuDanGuanBiFen,
    ZuQiuDanGuanJinQiuShu,
    ZuQiuDanGuanRangFenShengPingFu
  },
  created () {
    this.PageTitle = '混合投注（过关）'
    this.Init()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapMutations([
      'EditMainData', // 配置页面框架数据
      'EditMainItemData' // 配置页面框架数据
    ]),
    ...mapUserActions([
      'GetMixData'
    ]),
    ...mapUserMutations([
      'AddZuQiuCart',
      'EmptyZuQiuCart'
    ]),
    Init () { // 初始化
      this.MainTitle = '混合投注（过关）'
      this.ToGetPageList()
    },
    TotalNumChange (e) {
      this.TotalNum = e
    },
    ToGetPageList (passType = 'pass', wayCode = '') {
      this.NoData = null
      let queryData = { lottery: 'football', passType }
      if (wayCode !== '' && wayCode !== 'Mix') {
        queryData.wayCode = wayCode
      }
      this.GetMixData({ queryData }).then((res) => {
        this.MixData = res.data.data || []
        this.NoData = !this.MixData.length
      })
    },
    ToBetting () { // 去投注
      if (this.SelectType > 5) {
        if (this.ResList.length) {
          this.EmptyZuQiuCart()
          this.ResList.map((item) => {
            this.AddZuQiuCart(item)
          })
          this.$router.push({ name: 'ZuQiuDingDan', query: { type: 'single' } })
        }
      } else {
        if (this.ResList.length > 1) {
          this.EmptyZuQiuCart()
          this.ResList.map((item) => {
            this.AddZuQiuCart(item)
          })
          this.$router.push({ name: 'ZuQiuDingDan', query: { type: 'mix' } })
        }
      }
    },
    ResChange (e) { // 投注结果更新
      this.ResList = e
    },
    EmptyAllData () { // 清除数据
      this.ResList = []
      this.MixData.map((item) => {
        if (item.playOdds !== undefined) {
          for (let key in item.playOdds) {
            item.playOdds[key].map((subItem) => {
              subItem.Active = false
            })
          }
        }
      })
    },
    CutSelectType (item) { // 切换选法
      this.TotalNum = 0
      this.EmptyAllData() // 清除数据
      this.MixData = []
      this.ToGetPageList(item.PassType, item.Type)
      this.SelectType = item.Id
      this.PageTitle = `${item.Name}（${this.SelectType > 5 ? '单关' : '过关'}）`
      this.ShowSelectTypeNav = false
    },
    MainTitleClick () {
      this.ShowSelectTypeNav = !this.ShowSelectTypeNav
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
