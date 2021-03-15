<template>
  <div class="components LqgghhtzRangFenShengFu flex-h">
    <span>{{ListId}}</span>
    <div class="flex-item flex-h">
      <div class="flex-item flex-h">
        <a class="flex-item" v-for="(item, index) in PageWlsData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-wls')">{{item.name}} {{item.odds}}</a>
      </div>
    </div>
  </div>
</template>

<script>
/*
  页面名称：
*/
export default {
  name: 'LqgghhtzRangFenShengFu',
  props: {
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
    WlsData: {
      default: []
    }
  },
  data () {
    return {
      PageWlsData: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
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
      this.$emit('SelectItem', {pIndex: this.Index, value: item.Active, key, cIndex: index, id: this.Id, target: item, homeTeamName: this.HomeTeamName, awayTeamName: this.AwayTeamName, homeTeamId: this.HomeTeamId, awayTeamId: this.AwayTeamId})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
