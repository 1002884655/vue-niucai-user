<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="账户设置">
      <div class="PageContainer">
        <ul v-if="UserInfo !== null">
          <li class="flex-h" @click="$refs.IconFile.click()">
            <span class="flex-item">头像</span>
            <div class="Icon">
              <img :src="UserInfo.avatar" class="centerLabel cover" alt="">
            </div>
            <i class="iconfont iconjiantouright"></i>
            <input type="file" ref="IconFile" @change="IconFileChange" style="display: none">
          </li>
          <router-link tag="li" class="flex-h" :to="{name: 'EditUserNick'}">
            <span class="flex-item">昵称</span>
            <span>{{UserInfo.name || '未设置'}}</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link>
          <router-link tag="li" class="flex-h" :to="{name: 'EditMiMa'}">
            <span class="flex-item">修改密码</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link>
          <!-- <router-link tag="li" class="flex-h" :to="{name: 'EditTiXianMiMa'}">
            <span class="flex-item">提现密码</span>
            <span>{{UserInfo.cashPass === null ? '未设置' : '已设置'}}</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link> -->
          <router-link tag="li" class="flex-h" :to="{name: 'BangDingShenFenZheng'}">
            <span class="flex-item">绑定身份证</span>
            <span>{{UserInfo.idCard === null ? '未绑定' : '已绑定'}}</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link>
          <!-- <router-link tag="li" class="flex-h" :to="{name: 'BangDingZhiFuBao'}">
            <span class="flex-item">绑定支付宝</span>
            <span>{{UserInfo.alipayUser === null ? '未绑定' : '已绑定'}}</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link> -->
        </ul>
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
      'ImgUpload',
      'UpdateUserInfo'
    ]),
    IconFileChange (e) {
      let aFormData = new FormData()
      aFormData.append('file', e.target.files[0])
      this.ImgUpload({ urlData: { plat: 'app' }, data: aFormData, headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
        this.$refs.IconFile.value = ''
        this.UpdateUserInfo({ urlData: { id: this.UserInfo.customerId }, data: { avatar: res.data.data } }).then(() => {
          this.Toast('头像更新成功')
          this.EditUserInfo({ name: 'avatar', value: res.data.data })
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
