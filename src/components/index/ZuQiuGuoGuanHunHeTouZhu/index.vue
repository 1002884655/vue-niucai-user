<template>
  <div class="components ZuQiuGuoGuanHunHeTouZhu">
    <ul>
      <li v-for="(item, index) in PageData" :key="index" v-if="item.playOdds[`ft-wdl`] !== undefined && item.playOdds[`ft-wdls`] !== undefined">
        <div class="Title flex-h">
          <div class="flex-item">
            <div>
              <span>{{item.homeTeamName}} VS {{item.awayTeamName}}</span>
            </div>
          </div>
          <span>{{item.leagueName}}<em>{{item.matchTime}}(截)</em></span>
        </div>
        <div class="Detail">
          <ZqgghhtzShengPingFu ref="ZqgghhtzShengPingFu" :MoreSelect="item.MoreSelect" :Id="item.matchId" :ListId="item.matchWeek" :HomeTeamName="item.homeTeamName" :AwayTeamName="item.awayTeamName" :HomeTeamId="item.homeTeamId" :AwayTeamId="item.awayTeamId" :Index="index" :SpreadPoints="item.spreadPoints" :WdlData="item.playOdds['ft-wdl']" :WdlsData="item.playOdds['ft-wdls']" @SelectItem="SelectItem" @ShowMore="ToShowMore"></ZqgghhtzShengPingFu>
        </div>
      </li>
    </ul>

    <!-- 更多选项 -->
    <div class="MoreLayer" v-if="ShowMore">
      <div>
        <div>
          <span>{{CurrentTarget.homeTeamName}} VS {{CurrentTarget.awayTeamName}}</span>
          <ul>

            <li v-if="CurrentTarget.playOdds[`ft-wdl`] !== undefined && CurrentTarget.playOdds[`ft-wdls`] !== undefined">
              <ZqgghhtzShengPingFuMore :Id="CurrentTarget.matchId" :HomeTeamName="CurrentTarget.homeTeamName" :AwayTeamName="CurrentTarget.awayTeamName" :HomeTeamId="CurrentTarget.homeTeamId" :AwayTeamId="CurrentTarget.awayTeamId" :Index="CurrentIndex" :WdlData="CurrentTarget.playOdds['ft-wdl']" :WdlsData="CurrentTarget.playOdds['ft-wdls']" @SelectItem="SelectItem"></ZqgghhtzShengPingFuMore>
            </li>

            <li v-if="CurrentTarget.playOdds[`ft-score`] !== undefined">
              <ZqgghhtzBiFen :IsSingle="CurrentTarget.matchWay[`ft-score`].isSingle" :Id="CurrentTarget.matchId" :HomeTeamName="CurrentTarget.homeTeamName" :AwayTeamName="CurrentTarget.awayTeamName" :HomeTeamId="CurrentTarget.homeTeamId" :AwayTeamId="CurrentTarget.awayTeamId" :Index="CurrentIndex" :ScoreData="CurrentTarget.playOdds['ft-score']" @SelectItem="SelectItem"></ZqgghhtzBiFen>
            </li>

            <li v-if="CurrentTarget.playOdds[`ft-points`] !== undefined">
              <ZqgghhtzJinQiuShu :IsSingle="CurrentTarget.matchWay[`ft-points`].isSingle" :Id="CurrentTarget.matchId" :HomeTeamName="CurrentTarget.homeTeamName" :AwayTeamName="CurrentTarget.awayTeamName" :HomeTeamId="CurrentTarget.homeTeamId" :AwayTeamId="CurrentTarget.awayTeamId" :Index="CurrentIndex" :PointsData="CurrentTarget.playOdds['ft-points']" @SelectItem="SelectItem"></ZqgghhtzJinQiuShu>
            </li>

            <li v-if="CurrentTarget.playOdds[`ft-double`] !== undefined">
              <ZqgghhtzBanQuanChang :IsSingle="CurrentTarget.matchWay[`ft-double`].isSingle" :Id="CurrentTarget.matchId" :HomeTeamName="CurrentTarget.homeTeamName" :AwayTeamName="CurrentTarget.awayTeamName" :HomeTeamId="CurrentTarget.homeTeamId" :AwayTeamId="CurrentTarget.awayTeamId" :Index="CurrentIndex" :DoubleData="CurrentTarget.playOdds['ft-double']" @SelectItem="SelectItem"></ZqgghhtzBanQuanChang>
            </li>

          </ul>
          <div class="flex-h">
            <a class="flex-item" @click="ShowMore = false">取消</a>
            <a class="flex-item" @click="ShowMore = false">确认</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
  页面名称：足球-过关-混合投注
*/
import ZqgghhtzShengPingFu from '../ZqgghhtzShengPingFu'
import ZqgghhtzShengPingFuMore from '../ZqgghhtzShengPingFuMore'
import ZqgghhtzBiFen from '../ZqgghhtzBiFen'
import ZqgghhtzJinQiuShu from '../ZqgghhtzJinQiuShu'
import ZqgghhtzBanQuanChang from '../ZqgghhtzBanQuanChang'
export default {
  name: 'ZuQiuGuoGuanHunHeTouZhu',
  props: {
    Data: {
      default: []
    }
  },
  data () {
    return {
      PageData: [],
      ShowMore: false,
      CurrentTarget: null,
      CurrentIndex: null,
      ResList: []
    }
  },
  computed: {
  },
  components: {
    ZqgghhtzShengPingFu,
    ZqgghhtzBiFen,
    ZqgghhtzJinQiuShu,
    ZqgghhtzBanQuanChang,
    ZqgghhtzShengPingFuMore
  },
  created () {
    let Num = 0
    this.Data.map((item) => {
      if (item.playOdds[`ft-wdl`] !== undefined && item.playOdds[`ft-wdls`] !== undefined) {
        Num += 1
      }
      this.PageData.push({ ...item, MoreSelect: false })
    })
    this.$emit('TotalNumChange', Num)
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ToShowMore (e) { // 显示更多
      this.CurrentIndex = e
      this.CurrentTarget = { ...this.PageData[e] }
      for (let key in this.CurrentTarget.playOdds) {
        this.CurrentTarget.playOdds[key].map((item) => {
          item.Active = item.Active !== undefined ? item.Active : false
        })
      }
      this.ShowMore = true
    },
    SelectItem (e) { // 选择投注
      this.TriggerRes(e.pIndex, e.cIndex, e.key, e.value, e.target, e.id, e.homeTeamName, e.awayTeamName, e.homeTeamId, e.awayTeamId)
    },
    TriggerRes (pIndex, cIndex, key, value, target, id, homeTeamName, awayTeamName, homeTeamId, awayTeamId) {
      this.PageData[pIndex].playOdds[key][cIndex].Active = value
      if (key.indexOf('wdl') > -1) {
        this.$refs.ZqgghhtzShengPingFu[pIndex].Init()
      }
      if (value) { // 新增投注
        let Bool = false
        this.ResList.map((item) => {
          if (item.id === id) {
            Bool = true
            item.list.push({ ...target })
            return false
          }
        })
        if (!Bool) {
          this.ResList.push({ id, list: [], homeTeamName, awayTeamName, homeTeamId, awayTeamId, rq: this.PageData[pIndex].spreadPoints, ys: this.PageData[pIndex].presetPoints })
          this.ResList[this.ResList.length - 1].list.push({ ...target })
        }
        if (key !== 'ft-wdl' && key !== 'ft-wdls') {
          this.PageData[pIndex].MoreSelect = true
        }
      } else { // 删除投注
        this.ResList.map((item, index) => {
          let MarkBool = true
          item.list.map((subItem, subIndex) => {
            if (subItem.ruleCode === target.ruleCode && subItem.name === target.name) {
              MarkBool = false
              item.list.splice(subIndex, 1)
              if (!item.list.length) {
                this.ResList.splice(index, 1)
              }
            }
          })
          if (!MarkBool) { // 删除投注时检测更多选项有无选中投注，更新更多选项按钮状态
            let SubMarkBool = true
            item.list.map((subItem) => {
              if (subItem.wayCode !== 'ft-wdl' && subItem.wayCode !== 'ft-wdls') {
                SubMarkBool = false
              }
            })
            if (!SubMarkBool) {
              this.PageData[pIndex].MoreSelect = false
            }
            if (!item.list.length) {
              this.PageData[pIndex].MoreSelect = false
            }
          }
        })
      }
      this.$emit('Change', this.ResList)
      // console.log(JSON.stringify(this.ResList))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
