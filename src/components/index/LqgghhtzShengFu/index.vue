<template>
  <div class="components LqgghhtzShengFu flex-h">
    <span>{{ListId}}</span>
    <div class="flex-item flex-h">
      <div class="flex-item">
        <div class="flex-h">
          <a class="flex-item" v-for="(item, index) in PageWlData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-wl')">{{`${item.name} ${item.odds}`}}</a>
        </div>
        <div class="flex-h">
          <a class="flex-item" v-for="(item, index) in PageWlsData" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'bst-wls')">{{`让${item.name} ${item.odds}`}}</a>
        </div>
      </div>
      <a @click="$emit('ShowMore', Index)" :class="{'active': MoreSelect}">更多<br />选项</a>
    </div>
  </div>
</template>

<script>
/*
  页面名称：
*/
export default {
  name: 'LqgghhtzShengFu',
  props: {
    MoreSelect: {
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
    this.Init()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    Init () {
      this.PageWlData = []
      this.PageWlsData = []
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
