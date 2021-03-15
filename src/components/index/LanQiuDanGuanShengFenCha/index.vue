<template>
  <div class="components LanQiuDanGuanShengFenCha">
    <ul>
      <li v-for="(item, index) in PageData" :key="index" v-if="item.playOdds['bst-points'] !== undefined && item.matchWay[`bst-points`].isSingle">
        <div class="Title flex-h">
          <div class="flex-item">
            <div>
              <span>{{item.awayTeamName}} VS {{item.homeTeamName}}</span>
            </div>
          </div>
          <span>{{item.leagueName}}<em>{{item.matchTime}}(截)</em></span>
        </div>
        <div class="Detail flex-h">
          <!-- <span>{{item.awayTeamId}}</span> -->
          <div class="flex-item flex-h">
            <div class="flex-item">
              <div @click="SelectPoints(item, index)">
                <a v-if="!item.ResList.length">点击选择投注选项</a>
                <span v-for="(subItem, subIndex) in item.ResList" :key="subIndex">{{subItem.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <!-- 选项 -->
    <div class="MoreTab" v-if="ShowMore && CurrentTarget !== null">
      <div>
        <div>
          <span>{{CurrentTarget.homeTeamName}} VS {{CurrentTarget.awayTeamName}}</span>
          <div class="Content">
            <div>
              <a v-for="(item, index) in PointsData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-points')">
                <span>{{item.name}}</span>
                <span>{{item.odds}}</span>
              </a>
              <a><span>全选</span></a>
              <a><span>清除</span></a>
            </div>
          </div>
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
export default {
  name: 'LanQiuDanGuanShengFenCha',
  props: {
    Data: {
      default: []
    }
  },
  data () {
    return {
      PointsData: [],
      CurrentTarget: null,
      CurrentIndex: null,
      ShowMore: false,
      NavActiveIndex: 0,
      PageData: [],
      ResList: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    let Arr = []
    let Num = 0
    this.Data.map((item) => {
      Arr.push({ ...item, ResList: [] })
    })
    Arr.map((item) => {
      if (item.playOdds['bst-points'] !== undefined) {
        Num += 1
        item.playOdds['bst-points'].map((subItem) => {
          if (subItem.Active === undefined) {
            subItem.Active = false
          }
        })
      }
    })
    this.PageData = [...Arr]
    this.$emit('TotalNumChange', Num)
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    SelectPoints (item, index) { // 打开选择弹窗
      this.CurrentTarget = item
      this.CurrentIndex = index
      this.PointsData = []
      if (this.CurrentTarget.playOdds['bst-points'] !== undefined) {
        this.CurrentTarget.playOdds['bst-points'].map((item) => {
          if (item.Active === undefined) {
            this.PointsData.push({ ...item, Active: false })
          } else {
            this.PointsData.push({ ...item })
          }
        })
      }
      this.ShowMore = true
    },
    SelectItem (item, index, key) { // 选择投注
      item.Active = !item.Active
      this.TriggerRes(this.CurrentIndex, index, key, item.Active, item, this.CurrentTarget.matchId)
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
