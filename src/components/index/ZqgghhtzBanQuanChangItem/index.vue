<template>
  <div class="components ZqgghhtzBanQuanChangItem flex-h">
    <span>{{ListId}}</span>
    <div class="flex-item flex-h">
      <div class="flex-item">
        <div class="flex-h">
          <a class="flex-item" v-for="(item, index) in PageDoubleData" v-if="index < 3" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-double')"><em>{{item.name}}</em> {{item.odds}}</a>
        </div>
        <div class="flex-h">
          <a class="flex-item" v-for="(item, index) in PageDoubleData" v-if="index >= 3 && index < 6" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-double')"><em>{{item.name}}</em> {{item.odds}}</a>
        </div>
        <div class="flex-h">
          <a class="flex-item" v-for="(item, index) in PageDoubleData" v-if="index >= 6" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-double')"><em>{{item.name}}</em> {{item.odds}}</a>
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
  name: 'ZqgghhtzBanQuanChangItem',
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
