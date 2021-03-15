<template>
  <div class="components ZqgghhtzShengPingFuMore">
    <span>胜平负</span>
    <table>
      <tr>
        <td rowspan="2"><span>胜平负</span></td>
        <td v-for="(item, index) in PageWdlData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-wdl')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PageWdlsData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-wdls')">
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
  name: 'ZqgghhtzShengPingFuMore',
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
    WdlData: {
      default: []
    },
    WdlsData: {
      default: []
    }
  },
  data () {
    return {
      PageWdlData: [],
      PageWdlsData: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    this.WdlData.map((item) => {
      if (item.Active !== undefined) {
        this.PageWdlData.push({ ...item })
      } else {
        this.PageWdlData.push({ ...item, Active: false })
      }
    })
    this.WdlsData.map((item) => {
      if (item.Active !== undefined) {
        this.PageWdlsData.push({ ...item })
      } else {
        this.PageWdlsData.push({ ...item, Active: false })
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
