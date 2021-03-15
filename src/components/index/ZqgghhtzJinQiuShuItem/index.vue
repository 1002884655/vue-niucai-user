<template>
  <div class="components ZqgghhtzJinQiuShuItem flex-h">
    <span>{{ListId}}</span>
    <div class="flex-item flex-h">
      <div class="flex-item">
        <div class="flex-h">
          <a class="flex-item" v-for="(item, index) in PagePointsData" v-if="index < 4" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-points')"><em>{{item.name}}</em> {{item.odds}}</a>
        </div>
        <div class="flex-h">
          <a class="flex-item" v-for="(item, index) in PagePointsData" v-if="index >= 4" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-points')"><em>{{item.name}}</em> {{item.odds}}</a>
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
  name: 'ZqgghhtzJinQiuShuItem',
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
