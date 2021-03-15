<template>
  <div class="Page">
    <MainPageContainer :GoBack="() => { $router.replace({ name: 'index' }) }" :ShowMainHeader="true" :ShowMainTitleIcon="true" :ShowMainHeaderBack="true" :MainHeaderTitle="MainTitle" :MainTitleClick="MainTitleClick">
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
              <img src="../../../assets/img/icon6.png" class="centerLabel contain" alt="">
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
                  <LanQiuGuoGuanHunHeTouZhu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></LanQiuGuoGuanHunHeTouZhu>
                </div>

                <!-- 过关-胜负 -->
                <div class="GuoGuanShengFu" v-if="SelectType === 2">
                  <LanQiuGuoGuanShengFu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></LanQiuGuoGuanShengFu>
                </div>

                <!-- 过关-让分胜负 -->
                <div class="GuoGuanRangFenShengFu" v-if="SelectType === 3">
                  <LanQiuGuoGuanRangFenShengFu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></LanQiuGuoGuanRangFenShengFu>
                </div>

                <!-- 过关-胜分差 -->
                <div class="GuoGuanShengFenCha" v-if="SelectType === 4">
                  <LanQiuGuoGuanShengFenCha v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></LanQiuGuoGuanShengFenCha>
                </div>

                <!-- 过关-大小分 -->
                <div class="GuoGuanDaXiaoFen" v-if="SelectType === 5">
                  <LanQiuGuoGuanDaXiaoFen v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></LanQiuGuoGuanDaXiaoFen>
                </div>

                <!-- 单关-胜负 -->
                <div class="DanGuanShengFu" v-if="SelectType === 6">
                  <LanQiuDanGuanShengFu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></LanQiuDanGuanShengFu>
                </div>

                <!-- 单关-让分胜负 -->
                <div class="DanGuanRangFenShengFu" v-if="SelectType === 7">
                  <LanQiuDanGuanRangFenShengFu v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></LanQiuDanGuanRangFenShengFu>
                </div>

                <!-- 单关-胜分差 -->
                <div class="DanGuanShengFenCha" v-if="SelectType === 8">
                  <LanQiuDanGuanShengFenCha v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></LanQiuDanGuanShengFenCha>
                </div>

                <!-- 单关-大小分 -->
                <div class="DanGuanDaXiaoFen" v-if="SelectType === 9">
                  <LanQiuDanGuanDaXiaoFen v-if="MixData.length" :Data="MixData" @Change="ResChange" @TotalNumChange="TotalNumChange"></LanQiuDanGuanDaXiaoFen>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- 投注栏 -->
        <div class="Bottom flex-h">
          <a class="iconfont iconjian" @click="EmptyAllData"></a>
          <div class="flex-item"></div>
          <span>{{ResList.length ? `已选择${ResList.length}场比赛` : SelectType > 5 ? '单关至少选一场比赛' : '非单关至少选两场比赛'}}</span>
          <a class="Btn" @click="ToBetting">投注</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MainPageContainer from '../../../components/common/MainPageContainer'
const LanQiuGuoGuanHunHeTouZhu = () => import('../../../components/index/LanQiuGuoGuanHunHeTouZhu')
const LanQiuGuoGuanShengFu = () => import('../../../components/index/LanQiuGuoGuanShengFu')
const LanQiuGuoGuanRangFenShengFu = () => import('../../../components/index/LanQiuGuoGuanRangFenShengFu')
const LanQiuGuoGuanDaXiaoFen = () => import('../../../components/index/LanQiuGuoGuanDaXiaoFen')
const LanQiuDanGuanShengFu = () => import('../../../components/index/LanQiuDanGuanShengFu')
const LanQiuDanGuanRangFenShengFu = () => import('../../../components/index/LanQiuDanGuanRangFenShengFu')
const LanQiuDanGuanDaXiaoFen = () => import('../../../components/index/LanQiuDanGuanDaXiaoFen')
const LanQiuGuoGuanShengFenCha = () => import('../../../components/index/LanQiuGuoGuanShengFenCha')
const LanQiuDanGuanShengFenCha = () => import('../../../components/index/LanQiuDanGuanShengFenCha')
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      TotalNum: 0,
      NoData: null,
      MainTitle: '',
      SelectTypeData: {
        GuoGuan: {
          Name: '过关',
          List: [
            { Name: '混合投注', Id: 1, Type: 'Mix', PassType: 'pass' },
            { Name: '胜负', Id: 2, Type: 'bst-wl', PassType: 'pass' },
            { Name: '让分胜负', Id: 3, Type: 'bst-wls', PassType: 'pass' },
            { Name: '胜分差', Id: 4, Type: 'bst-points', PassType: 'pass' },
            { Name: '大小分', Id: 5, Type: 'bst-score', PassType: 'pass' }
          ]
        },
        DanGuan: {
          Name: '单关',
          List: [
            { Name: '胜负', Id: 6, Type: 'bst-wl', PassType: 'single' },
            { Name: '让分胜负', Id: 7, Type: 'bst-wls', PassType: 'single' },
            { Name: '胜分差', Id: 8, Type: 'bst-points', PassType: 'single' },
            { Name: '大小分', Id: 9, Type: 'bst-score', PassType: 'single' }
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
    LanQiuGuoGuanHunHeTouZhu,
    LanQiuGuoGuanShengFu,
    LanQiuGuoGuanRangFenShengFu,
    LanQiuGuoGuanDaXiaoFen,
    LanQiuDanGuanShengFu,
    LanQiuDanGuanRangFenShengFu,
    LanQiuDanGuanDaXiaoFen,
    LanQiuGuoGuanShengFenCha,
    LanQiuDanGuanShengFenCha
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
      'GetMixData'
    ]),
    ...mapUserMutations([
      'AddLanQiuCart',
      'EmptyLanQiuCart'
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
      let queryData = { lottery: 'basketball', passType }
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
          this.EmptyLanQiuCart()
          this.ResList.map((item) => {
            this.AddLanQiuCart(item)
          })
          this.$router.push({ name: 'LanQiuDingDan', query: { type: 'single' } })
        }
      } else {
        if (this.ResList.length > 1) {
          this.EmptyLanQiuCart()
          this.ResList.map((item) => {
            this.AddLanQiuCart(item)
          })
          this.$router.push({ name: 'LanQiuDingDan', query: { type: 'mix' } })
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
      this.MainTitle = `${item.Name}（${this.SelectType > 5 ? '单关' : '过关'}）`
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
