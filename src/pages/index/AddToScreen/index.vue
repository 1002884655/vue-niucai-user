<template>
  <div class="Page">
    <img src="../../../assets/img/safarilayer.jpg" width="100%" alt="">
    <a class="iconfont iconjiantouleft" @click="$router.go(-1)"></a>
  </div>
</template>

<script>export default {
  name: 'index',
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
