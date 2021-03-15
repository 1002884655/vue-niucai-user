<template>
  <div class="components ZqgghhtzJinQiuShu">
    <span><em v-if="IsSingle">单</em>进球数</span>
    <table>
      <tr>
        <td rowspan="2">
          <span>进球数</span>
        </td>
        <td v-for="(item, index) in PagePointsData.slice(0, 4)" v-if="index < 4" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-points')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PagePointsData.slice(4, 8)" v-if="index >= 4 && index < 8" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-points')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
/*
  页面名称：
*/
export default {
  name: 'ZqgghhtzJinQiuShu',
  props: {
    IsSingle: {
      default: false
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
    PointsData: {
      default: []
    }
  },
  data () {
    return {
      PagePointsData: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    this.PointsData.map((item) => {
      if (item.Active !== undefined) {
        this.PagePointsData.push({ ...item })
      } else {
        this.PagePointsData.push({ ...item, Active: false })
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    SelectItem (item, index, key) { // 选择投注
      item.Active = !item.Active
      this.$emit('SelectItem', {pIndex: this.Index, value: item.Active, key, cIndex: index, id: this.Id, target: item, homeTeamName: this.HomeTeamName, awayTeamName: this.AwayTeamName, homeTeamId: this.HomeTeamId, awayTeamId: this.AwayTeamId})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
