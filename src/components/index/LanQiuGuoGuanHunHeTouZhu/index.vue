<template>
  <div class="components LanQiuGuoGuanHunHeTouZhu">
    <ul>
      <li v-for="(item, index) in PageData" :key="index">
        <div v-if="item.playOdds[`bst-wl`] !== undefined && item.playOdds[`bst-wls`] !== undefined && item.matchWay[`bst-wl`].isPass && item.matchWay[`bst-wls`].isPass">
          <div class="Title flex-h">
            <div class="flex-item">
              <div>
                <span>{{item.awayTeamName}} VS {{item.homeTeamName}}</span>
              </div>
            </div>
            <span>{{item.leagueName}}<em>{{item.matchTime}}(截)</em></span>
          </div>
          <div class="Detail">
            <LqgghhtzShengFu ref="LqgghhtzShengFu" :MoreSelect="item.MoreSelect" :Id="item.matchId" :ListId="item.matchWeek" :HomeTeamName="item.homeTeamName" :AwayTeamName="item.awayTeamName" :HomeTeamId="item.homeTeamId" :AwayTeamId="item.awayTeamId" :Index="index" :WlData="item.playOdds['bst-wl']" :WlsData="item.playOdds['bst-wls']" @SelectItem="SelectItem" @ShowMore="ToShowMore"></LqgghhtzShengFu>
          </div>
        </div>
      </li>
    </ul>

    <!-- 更多选项 -->
    <div class="MoreLayer" v-if="ShowMore">
      <div>
        <div>
          <span>{{CurrentTarget.awayTeamName}} VS {{CurrentTarget.homeTeamName}}</span>
          <ul>

            <li v-if="CurrentTarget.playOdds[`bst-wl`] !== undefined && CurrentTarget.playOdds[`bst-wls`] !== undefined">
              <LqgghhtzShengPingFuMore :Id="CurrentTarget.matchId" :PresetPoints="CurrentTarget.presetPoints" :HomeTeamName="CurrentTarget.homeTeamName" :AwayTeamName="CurrentTarget.awayTeamName" :HomeTeamId="CurrentTarget.homeTeamId" :AwayTeamId="CurrentTarget.awayTeamId" :Index="CurrentIndex" :WlData="CurrentTarget.playOdds['bst-wl']" :WlsData="CurrentTarget.playOdds['bst-wls']" @SelectItem="SelectItem"></LqgghhtzShengPingFuMore>
            </li>

            <li v-if="CurrentTarget.playOdds[`bst-score`] !== undefined">
              <LqgghhtzDaXiaoFen :IsSingle="CurrentTarget.matchWay[`bst-score`].isSingle" :Id="CurrentTarget.matchId" :PresetPoints="CurrentTarget.presetPoints" :HomeTeamName="CurrentTarget.homeTeamName" :AwayTeamName="CurrentTarget.awayTeamName" :HomeTeamId="CurrentTarget.homeTeamId" :AwayTeamId="CurrentTarget.awayTeamId" :Index="CurrentIndex" :ScoreData="CurrentTarget.playOdds['bst-score']" @SelectItem="SelectItem"></LqgghhtzDaXiaoFen>
            </li>

            <li v-if="CurrentTarget.playOdds[`bst-points`] !== undefined">
              <LqgghhtzShengFenCha :IsSingle="CurrentTarget.matchWay[`bst-points`].isSingle" :Id="CurrentTarget.matchId" :HomeTeamName="CurrentTarget.homeTeamName" :AwayTeamName="CurrentTarget.awayTeamName" :HomeTeamId="CurrentTarget.homeTeamId" :AwayTeamId="CurrentTarget.awayTeamId" :Index="CurrentIndex" :PointsData="CurrentTarget.playOdds['bst-points']" @SelectItem="SelectItem"></LqgghhtzShengFenCha>
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
import LqgghhtzShengFu from '../LqgghhtzShengFu'
import LqgghhtzDaXiaoFen from '../LqgghhtzDaXiaoFen'
import LqgghhtzShengFenCha from '../LqgghhtzShengFenCha'
import LqgghhtzShengPingFuMore from '../LqgghhtzShengPingFuMore'
export default {
  name: 'LanQiuGuoGuanHunHeTouZhu',
  props: {
    Data: {
      default: []
    }
  },
  data () {
    return {
      PageData: [],
      ResList: [],
      ShengNum: 0,
      ShengArr: [],
      FuArr: [],
      ShowMore: false,
      CurrentTarget: null,
      CurrentIndex: null
    }
  },
  computed: {
  },
  components: {
    LqgghhtzShengFu,
    LqgghhtzDaXiaoFen,
    LqgghhtzShengFenCha,
    LqgghhtzShengPingFuMore
  },
  created () {
    let Num = 0
    this.Data.map((item) => {
      if (item.playOdds[`bst-wl`] !== undefined && item.playOdds[`bst-wls`] !== undefined && item.matchWay[`bst-wl`].isPass && item.matchWay[`bst-wls`].isPass) {
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
      if (key.indexOf('wl') > -1) {
        this.$refs.LqgghhtzShengFu[pIndex].Init()
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
        if (key !== 'bst-wl' && key !== 'bst-wls') {
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
              if (subItem.wayCode !== 'bst-wl' && subItem.wayCode !== 'bst-wls') {
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
      // console.log(this.ResList)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
