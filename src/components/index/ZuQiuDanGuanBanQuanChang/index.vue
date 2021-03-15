<template>
  <div class="components ZuQiuDanGuanBanQuanChang">
    <ul>
      <li v-for="(item, index) in Data" :key="index" v-if="item.playOdds['ft-double'] !== undefined">
        <div class="Title flex-h">
          <div class="flex-item">
            <div>
              <span>{{item.homeTeamName}} VS {{item.awayTeamName}}</span>
            </div>
          </div>
          <span>{{item.leagueName}}<em>{{item.matchTime}}(截)</em></span>
        </div>
        <div class="Detail">
          <ZqgghhtzBanQuanChangItem :Id="item.matchId" :ListId="item.matchWeek" :HomeTeamName="item.homeTeamName" :AwayTeamName="item.awayTeamName" :HomeTeamId="item.homeTeamId" :AwayTeamId="item.awayTeamId" :Index="index" :DoubleData="item.playOdds['ft-double']" @SelectItem="SelectItem"></ZqgghhtzBanQuanChangItem>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
/*
  页面名称：足球-过关-混合投注
*/
import ZqgghhtzBanQuanChangItem from '../ZqgghhtzBanQuanChangItem'
export default {
  name: 'ZuQiuDanGuanBanQuanChang',
  props: {
    Data: {
      default: []
    }
  },
  data () {
    return {
      PageData: [...this.Data],
      ResList: []
    }
  },
  computed: {
  },
  components: {
    ZqgghhtzBanQuanChangItem
  },
  created () {
    let Num = 0
    this.Data.map((item) => {
      if (item.playOdds['ft-double'] !== undefined) {
        Num += 1
      }
    })
    this.$emit('TotalNumChange', Num)
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    SelectItem (e) { // 选择投注
      this.TriggerRes(e.pIndex, e.cIndex, e.key, e.value, e.target, e.id, e.homeTeamName, e.awayTeamName, e.homeTeamId, e.awayTeamId)
    },
    TriggerRes (pIndex, cIndex, key, value, target, id, homeTeamName, awayTeamName, homeTeamId, awayTeamId) {
      this.PageData[pIndex].playOdds[key][cIndex].Active = value
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
        if (key !== 'ft-double') {
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
              if (subItem.wayCode !== 'ft-double') {
                SubMarkBool = false
              }
            })
            if (!SubMarkBool) {
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
