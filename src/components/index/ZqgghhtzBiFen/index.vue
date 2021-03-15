<template>
  <div class="components ZqgghhtzBiFen">
    <span><em v-if="IsSingle">单</em>比分</span>
    <table>
      <tr>
        <td rowspan="3">
          <span>主胜</span>
        </td>
        <td v-for="(item, index) in PageScoreData" v-if="index < 5" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-score')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PageScoreData" v-if="index >= 5 && index < 10" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-score')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PageScoreData" v-if="index >= 10 && index < 13" :colspan="index === 12 ? 3 : 1" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-score')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <span>平</span>
        </td>
        <td v-for="(item, index) in PageScoreData" v-if="index >= 13 && index < 18" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-score')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td rowspan="3">
          <span>主负</span>
        </td>
        <td v-for="(item, index) in PageScoreData" v-if="index >= 18 && index < 23" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-score')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PageScoreData" v-if="index >= 23 && index < 28" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-score')">
          <span>{{item.name}}</span>
          <span>{{item.odds}}</span>
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in PageScoreData" v-if="index >= 28" :colspan="index === 30 ? 3 : 1" :key="index" :class="{'active': item.Active}" @click="SelectItem(item, index, 'ft-score')">
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
  name: 'ZqgghhtzBiFen',
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
    ScoreData: {
      default: []
    }
  },
  data () {
    return {
      PageScoreData: []
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    this.ScoreData.map((item) => {
      if (item.Active !== undefined) {
        this.PageScoreData.push({ ...item })
      } else {
        this.PageScoreData.push({ ...item, Active: false })
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
