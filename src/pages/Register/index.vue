<template>
  <div class="Page">

    <!-- 背景 -->
    <div class="TopContainer">
      <span class="centerLabel">欢迎来到牛彩！</span>
    </div>

    <!-- 表单 -->
    <ul class="Form">
      <li class="flex-h">
        <i class="iconfont iconshouji"></i>
        <div class="flex-item">
          <div>
            <input type="number" placeholder="请输入您的手机号码" v-model="Phone">
          </div>
        </div>
      </li>
      <li class="flex-h">
        <i class="iconfont iconmima"></i>
        <div class="flex-item">
          <div>
            <input type="password" placeholder="请输入密码" v-model="Password">
          </div>
        </div>
      </li>
      <li class="flex-h">
        <i class="iconfont iconmima"></i>
        <div class="flex-item">
          <div>
            <input type="number" placeholder="请输入验证码" v-model="Code">
          </div>
        </div>
        <a v-if="TimeNum === 60" @click="GetCode">获取验证码</a>
        <span v-else>{{TimeNum > 9 ? TimeNum : `0${TimeNum}`}}s后重新获取</span>
      </li>
      <li class="flex-h">
        <i class="iconfont iconshouji"></i>
        <div class="flex-item">
          <div>
            <input type="number" placeholder="请输入邀请码" v-model="InviteCode">
          </div>
        </div>
      </li>
    </ul>

    <span>已有账号？ <router-link :to="{ name: 'SignIn' }">去登录</router-link></span>

    <div class="Btn">
      <a @click="ToReg" :class="{'active': this.IsPhone(this.Phone) && this.Code !== '' && this.Password !== ''}">开始使用</a>
    </div>

    <!-- 三方登录 -->
    <!-- <div class="OtherSignIn">
      <span>
        <span>第三方账号登录</span>
      </span>
      <div>
        <a class="iconfont iconzhifubao"></a>
        <a class="iconfont iconweixin"></a>
      </div>
    </div> -->

  </div>
</template>

<script>
import md5 from 'js-md5'
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      Phone: '',
      Code: '',
      InviteCode: this.$route.query.code || null,
      Password: '',
      DataLock: false,
      Timer: null,
      TimeNum: 60
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
    ...mapUserActions([
      'UserRegister',
      'GetRegPhoneCode',
      'CheckRegPhoneCode',
      'SignIn'
    ]),
    Init () { // 初始化
    },
    ToReg () { // 去注册
      if (this.DataLock || !this.IsPhone(this.Phone) || this.Code === '' || this.Password === '') return
      this.DataLock = true
      this.CheckRegPhoneCode({ urlData: { phone: this.Phone }, queryData: { captcha: this.Code } }).then((res) => {
        this.UserRegister({
          data: {
            captcha: this.Code,
            name: this.Phone,
            password: md5(this.Password),
            referralCode: this.InviteCode,
            phone: this.Phone,
            avatar: '123'
          }
        }).then((res) => {
          this.Toast('注册成功！')
          window.localStorage.niucaiusername = this.Phone
          window.localStorage.niucaiuserpassword = this.Password
          this.$router.push({ name: 'index' })
        }).catch((res) => {
          this.Toast(res.data.message)
        })
        this.DataLock = false
      }).catch((res) => {
        this.Toast(res.data.message)
        this.DataLock = false
      })
    },
    IsPhone (str) { // 校验手机号
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      return !!myreg.test(str)
    },
    GetCode () { // 获取手机验证码
      if (this.DataLock || this.TimeNum !== 60 || !this.IsPhone(this.Phone)) return
      this.DataLock = false
      window.clearInterval(this.Timer)
      this.GetRegPhoneCode({ urlData: { phone: this.Phone } }).then(() => {
        this.DataLock = false
        if (this.TimeNum === 60) {
          this.TimeNum -= 1
        }
        this.Timer = window.setInterval(() => {
          if (this.TimeNum) {
            this.TimeNum -= 1
          } else {
            window.clearInterval(this.Timer)
            this.TimeNum = 60
          }
        }, 1000)
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
