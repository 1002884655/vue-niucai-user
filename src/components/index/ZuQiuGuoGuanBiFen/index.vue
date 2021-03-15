<template>
  <div class="components ZuQiuGuoGuanBiFen">
    <ul>
      <li v-for="(item, index) in PageData" :key="index" v-if="item.playOdds['ft-score'] !== undefined">
        <div class="Title flex-h">
          <div class="flex-item">
            <div>
              <span>{{item.homeTeamName}} VS {{item.awayTeamName}}</span>
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
          <nav class="flex-h">
            <a class="flex-item" :class="{'active': NavActiveIndex === 0}" @click="NavActiveIndex = 0"><span>主胜</span></a>
            <a class="flex-item" :class="{'active': NavActiveIndex === 1}" @click="NavActiveIndex = 1"><span>平</span></a>
            <a class="flex-item" :class="{'active': NavActiveIndex === 2}" @click="NavActiveIndex = 2"><span>负</span></a>
          </nav>
          <div class="Content">
            <div v-show="NavActiveIndex === 0">
              <ZqgghhtzBiFenItem :Min="0" :Max="13" :PlayOdds="PagePlayOdds" @SelectItem="SelectItem"></ZqgghhtzBiFenItem>
            </div>
            <div v-show="NavActiveIndex === 1">
              <ZqgghhtzBiFenItem :Min="13" :Max="18" :PlayOdds="PagePlayOdds" @SelectItem="SelectItem"></ZqgghhtzBiFenItem>
            </div>
            <div v-show="NavActiveIndex === 2">
              <ZqgghhtzBiFenItem :Min="18" :Max="31" :PlayOdds="PagePlayOdds" @SelectItem="SelectItem"></ZqgghhtzBiFenItem>
            </div>
          </div>
          <div class="flex-h">
            <a class="flex-item" @click="ShowMore = false; NavActiveIndex = 0;">取消</a>
            <a class="flex-item" @click="ShowMore = false; NavActiveIndex = 0;">确认</a>
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
import ZqgghhtzBiFenItem from '../ZqgghhtzBiFenItem'
export default {
  name: 'ZuQiuGuoGuanBiFen',
  props: {
    Data: {
      default: []
    }
  },
  data () {
    return {
      PagePlayOdds: [],
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
    ZqgghhtzBiFenItem
  },
  created () {
    let Arr = []
    let Num = 0
    this.Data.map((item) => {
      Arr.push({ ...item, ResList: [] })
    })
    Arr.map((item) => {
      if (item.playOdds['ft-score'] !== undefined) {
        Num += 1
        item.playOdds['ft-score'].map((subItem) => {
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
      this.PagePlayOdds = [...this.CurrentTarget.playOdds['ft-score']]
      this.ShowMore = true
    },
    SelectItem (e) { // 选择投注
      this.TriggerRes(this.CurrentIndex, e.cIndex, e.key, e.value, e.target, this.CurrentTarget.matchId)
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
        if (key !== 'ft-score') {
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
              if (subItem.wayCode !== 'ft-score') {
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
