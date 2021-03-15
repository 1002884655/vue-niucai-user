<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="邀请注册">
      <div class="PageContainer">
        <div class="centerLabel Card">
          <div class="Title">
            <span>您的邀请码为</span>
          </div>
          <span>123456789</span>
          <span class="Small">好友也可以在注册时直接填写邀请码</span>
          <div class="QrCode"></div>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../../components/common/MainPageContainer'
export default {
  name: '',
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    MainPageContainer
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
