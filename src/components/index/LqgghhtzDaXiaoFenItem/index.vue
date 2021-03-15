<template>
  <div class="components LqgghhtzDaXiaoFenItem flex-h">
    <span>{{ListId}}</span>
    <div class="flex-item flex-h">
      <div class="flex-item flex-h">
        <a class="flex-item" v-for="(item, index) in PageScoreData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-score')">{{item.name}} {{item.odds}}</a>
      </div>
    </div>
  </div>
</template>

<script>
/*
  页面名称：
*/
export default {
  name: 'LqgghhtzDaXiaoFenItem',
  props: {
    PresetPoints: {
      default: 0
    },
    ListId: {
      default: null
    },
    Id: {
      default: null
    },
    HomeTeamName: {
      default: null
    },
    AwayTeamName: {
      default: null
    },
    HomeTeamId: {
      default: null
    },
    AwayTeamId: {
      default: null
    },
    Index: {
      default: null
    },
    ScoreData: {
      default: []
    }
  },
  data () {
    return {
      PageScoreData: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    this.ScoreData.map((item) => {
      if (item.Active !== undefined) {
        this.PageScoreData.push({ ...item })
      } else {
        this.PageScoreData.push({ ...item, Active: false })
      }
    })
    this.PageScoreData.splice(1, 0, { name: '预设总分', odds: this.PresetPoints, Active: null })
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    SelectItem (item, index, key) { // 选择投注
      if (item.Active !== null) {
        item.Active = !item.Active
        this.$emit('SelectItem', { pIndex: this.Index, value: item.Active, key, cIndex: index === 2 ? 1 : index, id: this.Id, target: item, homeTeamName: this.HomeTeamName, awayTeamName: this.AwayTeamName, homeTeamId: this.HomeTeamId, awayTeamId: this.AwayTeamId })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
