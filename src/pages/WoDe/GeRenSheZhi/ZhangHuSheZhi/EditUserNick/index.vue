<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="设置昵称" @UserInfoChange="Init">
      <div class="PageContainer">
        <div class="Form">
          <input type="text" placeholder="请输入2~12个字符" v-model="Name" @input="Name = Name.substring(0, 12)">
        </div>
        <span>填写成功后不可更改</span>
        <div class="Btn">
          <a @click="EditName">确认</a>
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
  name: '',
  data () {
    return {
      Name: ''
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
    })
  },
  methods: {
    ...mapUserMutations([
      'EditUserInfo'
    ]),
    ...mapUserActions([
      'UpdateUserInfo'
    ]),
    Init () {
      this.Name = this.UserInfo.name
    },
    EditName () {
      if (this.Name !== '') {
        this.UpdateUserInfo({ urlData: { id: this.UserInfo.customerId }, data: { name: this.Name } }).then(() => {
          this.Toast('昵称更新成功')
          this.EditUserInfo({ name: 'name', value: this.Name })
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
