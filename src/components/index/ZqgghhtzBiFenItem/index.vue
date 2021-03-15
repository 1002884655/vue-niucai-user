<template>
  <div class="components ZqgghhtzBiFenItem">
    <a v-for="(item, index) in PagePlayOdds" v-if="index >= Min && index < Max" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-score')">{{item.name}}</a>
    <a @click="SelectAll(Min, Max)">全选</a>
    <a @click="Empty(Min, Max)">清除</a>
  </div>
</template>

<script>
/*
  页面名称：
*/
export default {
  name: 'ZqgghhtzBiFenItem',
  props: {
    Min: {
      default: 0
    },
    Max: {
      default: 0
    },
    PlayOdds: {
      default: []
    }
  },
  data () {
    return {
      PagePlayOdds: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    this.PlayOdds.map((item) => {
      if (item.Active !== undefined) {
        this.PagePlayOdds.push({ ...item })
      } else {
        this.PagePlayOdds.push({ ...item, Active: false })
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    SelectAll (min, max) { // 全选
      this.PagePlayOdds.map((item, index) => {
        if (index >= min && index < max) {
          if (!item.Active) {
            this.SelectItem(item, index, 'ft-score')
          }
        }
      })
    },
    Empty (min, max) { // 清除
      this.PagePlayOdds.map((item, index) => {
        if (index >= min && index < max) {
          if (item.Active) {
            this.SelectItem(item, index, 'ft-score')
          }
        }
      })
    },
    SelectItem (item, index, key) { // 选择投注
      item.Active = !item.Active
      this.$emit('SelectItem', { value: item.Active, key, cIndex: index, target: item })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
