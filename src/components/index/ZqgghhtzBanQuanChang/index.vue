<template>
  <div class="components ZqgghhtzBanQuanChang">
    <span><em v-if="IsSingle">单</em>半全场</span>
    <table>
      <tr>
        <td rowspan="3">
          <span>半全场</span>
        </td>
        <td v-for="(item, index) in PageDoubleData" v-if="index < 3" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-double')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PageDoubleData" v-if="index >= 3 && index < 6" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-double')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PageDoubleData" v-if="index >= 6 && index < 9" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-double')">
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
  name: 'ZqgghhtzBanQuanChang',
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
    DoubleData: {
      default: []
    }
  },
  data () {
    return {
      PageDoubleData: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    this.DoubleData.map((item) => {
      if (item.Active !== undefined) {
        this.PageDoubleData.push({ ...item })
      } else {
        this.PageDoubleData.push({ ...item, Active: false })
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
