<template>
  <div class="components LqgghhtzShengPingFuMore">
    <span>胜平负</span>
    <table>
      <tr>
        <td rowspan="2"><span>胜平负</span></td>
        <td v-for="(item, index) in PageWlData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-wl')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PageWlsData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-wls')">
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
  name: 'LqgghhtzShengPingFuMore',
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
    WlData: {
      default: []
    },
    WlsData: {
      default: []
    }
  },
  data () {
    return {
      PageWlData: [],
      PageWlsData: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    this.WlData.map((item) => {
      if (item.Active !== undefined) {
        this.PageWlData.push({ ...item })
      } else {
        this.PageWlData.push({ ...item, Active: false })
      }
    })
    this.WlsData.map((item) => {
      if (item.Active !== undefined) {
        this.PageWlsData.push({ ...item })
      } else {
        this.PageWlsData.push({ ...item, Active: false })
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
      this.$emit('SelectItem', { pIndex: this.Index, value: item.Active, key, cIndex: index, id: this.Id, target: item, homeTeamName: this.HomeTeamName, awayTeamName: this.AwayTeamName, homeTeamId: this.HomeTeamId, awayTeamId: this.AwayTeamId })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
