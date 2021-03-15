<template>
  <div class="components ZqdghhtzRangFenShengPingFu flex-h">
    <!-- <span>{{ListId}}</span> -->
    <div class="flex-item flex-h">
      <div class="flex-item">
        <div class="flex-h">
          <a class="flex-item" v-for="(item, index) in PageWdlData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-wdls')">{{`${item.name} ${item.odds}`}}</a>
        </div>
        <!-- <span>未开售</span> -->
      </div>
    </div>
  </div>
</template>

<script>
/*
  页面名称：
*/
export default {
  name: 'ZqdghhtzRangFenShengPingFu',
  props: {
    MoreSelect: {
      default: false
    },
    SpreadPoints: {
      default: null
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
    WdlsData: {
      default: []
    }
  },
  data () {
    return {
      PageWdlData: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    this.WdlsData.map((item) => {
      if (item.Active !== undefined) {
        this.PageWdlData.push({ ...item })
      } else {
        this.PageWdlData.push({ ...item, Active: false })
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
