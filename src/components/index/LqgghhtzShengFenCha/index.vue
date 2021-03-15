<template>
  <div class="components LqgghhtzShengFenCha">
    <span><em v-if="IsSingle">单</em>胜分差</span>
    <table>
      <tr>
        <td :rowspan="Math.ceil(ShengLength / 3)">
          <span>主胜</span>
        </td>
        <td v-for="(item, index) in PagePointsData" :key="index" v-if="item.name.indexOf('胜') > -1 && index < 3" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-points')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PagePointsData" :key="index" v-if="item.name.indexOf('胜') > -1 && index >= 3" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-points')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td :rowspan="Math.ceil(FuLength / 3)">
          <span>客胜</span>
        </td>
        <td v-for="(item, index) in PagePointsData" :key="index" v-if="item.name.indexOf('负') > -1 && index < ShengLength + 3" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-points')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PagePointsData" :key="index" v-if="item.name.indexOf('负') > -1 && index >= ShengLength + 3" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-points')">
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
  name: 'LqgghhtzShengFenCha',
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
      ShengLength: 0,
      FuLength: 0,
      PagePointsData: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    this.ShengLength = 0
    this.FuLength = 0
    this.PointsData.map((item) => {
      if (item.name.indexOf('胜') > -1) {
        this.ShengLength += 1
      } else {
        this.FuLength += 1
      }
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
