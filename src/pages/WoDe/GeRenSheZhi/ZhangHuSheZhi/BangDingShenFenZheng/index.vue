<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="绑定身份证" @UserInfoChange="Init">
      <div class="PageContainer">
        <div class="Form">
          <input type="text" placeholder="请输入身份证号码" v-model="IdCard">
        </div>
        <div class="Form">
          <input type="text" placeholder="请确认您的姓名" v-model="RealName">
        </div>
        <div class="Btn">
          <a @click="ToBindIdCard">确认</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'BangDingShenFenzZheng',
  data () {
    return {
      IdCard: '',
      RealName: '',
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    })
  },
  components: {
    MainPageContainer
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.IdCard = (this.UserInfo || {}).idCard
      this.RealName = (this.UserInfo || {}).realName
    })
  },
  methods: {
    ...mapUserMutations([
      'EditUserInfo'
    ]),
    ...mapUserActions([
      'BindIdCard'
    ]),
    Init () {
    },
    ToBindIdCard () {
      if (this.DataLock) return
      this.DataLock = true
      if (this.IdCard === '') {
        this.Toast('身份证号不能为空')
        this.DataLock = false
        return false
      }
      if (this.RealName === '') {
        this.Toast('姓名不能为空')
        this.DataLock = false
        return false
      }
      this.BindIdCard({ data: { idCard: this.IdCard, realName: this.RealName } }).then(() => {
        this.Toast('绑定身份证成功')
        this.EditUserInfo({ name: 'idCard', value: this.IdCard })
        this.DataLock = false
        this.$router.go(-1)
      }).catch((res) => {
        this.Toast(res.data.message)
        this.DataLock = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
