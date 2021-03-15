<template>
  <div class="components ZqgghhtzShengPingFuItem flex-h">
    <!-- <span>{{ListId}}</span> -->
    <div class="flex-item flex-h">
      <div class="flex-item">
        <div class="flex-h">
          <a class="flex-item" v-for="(item, index) in PageWdlData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-wdl')">{{item.name}} {{item.odds}}</a>
        </div>
        <div class="flex-h">
          <a class="flex-item" v-for="(item, index) in PageWdlsData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-wdls')">{{item.name}} {{item.odds}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
  页面名称：
*/
export default {
  name: 'ZqgghhtzShengPingFuItem',
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
      this.$emit('SelectItem', {pIndex: this.Index, value: item.Active, key, cIndex: index, id: this.Id, target: item, homeTeamName: this.HomeTeamName, awayTeamName: this.AwayTeamName, homeTeamId: this.HomeTeamId, awayTeamId: this.AwayTeamId})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
