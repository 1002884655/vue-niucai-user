<template>
  <div class="components LanQiuDanGuanShengFu">

    <ul>
      <li v-for="(item, index) in PageData" :key="index" v-if="item.playOdds[`bst-wl`] !== undefined && item.matchWay[`bst-wl`].isSingle">
        <div class="Title flex-h">
          <div class="flex-item">
            <div>
              <span>{{item.awayTeamName}} VS {{item.homeTeamName}}</span>
            </div>
          </div>
          <span>{{item.leagueName}}<em>{{item.matchTime}}(截)</em></span>
        </div>
        <div class="Detail">
          <LqgghhtzShengFuItem :Id="item.matchId" :ListId="item.matchWeek" :HomeTeamName="item.homeTeamName" :AwayTeamName="item.awayTeamName" :HomeTeamId="item.homeTeamId" :AwayTeamId="item.awayTeamId" :Index="index" :WlData="item.playOdds['bst-wl']" @SelectItem="SelectItem"></LqgghhtzShengFuItem>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
/*
  页面名称：足球-过关-混合投注
*/
import LqgghhtzShengFuItem from '../LqgghhtzShengFuItem'
export default {
  name: 'LanQiuDanGuanShengFu',
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
    LqgghhtzShengFuItem
  },
  created () {
    let Num = 0
    this.Data.map((item) => {
      if (item.playOdds[`bst-wl`] !== undefined && item.matchWay[`bst-wl`].isSingle) {
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
      } else { // 删除投注
        this.ResList.map((item, index) => {
          item.list.map((subItem, subIndex) => {
            if (subItem.ruleCode === target.ruleCode && subItem.name === target.name) {
              item.list.splice(subIndex, 1)
              if (!item.list.length) {
                this.ResList.splice(index, 1)
              }
            }
          })
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
