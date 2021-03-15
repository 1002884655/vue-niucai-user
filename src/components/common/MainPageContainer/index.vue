<template>
  <div class="components MainPageContainer flex-v">

    <!-- 头部 -->
    <div class="MainHeaderPadding" v-if="ShowMainHeader" :style="{height: `${MainPaddingTop}px`}"></div>
    <div class="MainHeader flex-h" v-if="ShowMainHeader">
      <a class="MainBack iconfont iconjiantouleft" v-if="ShowMainHeaderBack" @click="() => { GoBack === null ? $router.back(-1) : GoBack() }"></a>
      <span class="MainTitle">
        <span @click="MainTitleClick()">{{MainHeaderTitle}}</span>
        <a class="iconfont iconjiantoudown" @click="MainTitleClick()" v-if="ShowMainTitleIcon"></a>
      </span>
      <a class="MainHeaderRight" v-if="ShowMainHeaderRight" @click="MainHeaderRightClick()">
        <i class="iconfont" :class="MainHeaderRightIcon" v-if="MainHeaderRightIcon !== null"></i>
        <span>{{MainHeaderRightText}}</span>
      </a>
    </div>

    <!-- 内容 -->
    <div class="MainBody flex-item">
      <div>
        <slot></slot>
      </div>
    </div>

    <!-- tabbar -->
    <div class="TabBar flex-h" :style="{paddingBottom: `${MainPaddingBottom}px`}" v-if="ShowMainTabBar">
      <div class="flex-item" v-for="(item, index) in MainTabBar" :key="index">
        <router-link :to="{name: item.router}" :class="{'active': item.id === MainTabBarActiveId}" :replace="true">
          <i class="iconfont" :class="item.icon"></i>
          <span>{{item.name}}</span>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
/*
  页面名称：
*/
import md5 from 'js-md5'
import { mapState, mapActions, mapMutations, createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: 'MainPageContainer',
  props: {
    GoBack: {
      default: null
    },
    ShowMainHeaderRight: { // 显隐头部右边选项
      default: false,
      type: Boolean
    },
    MainHeaderRightIcon: { // 头部右边选项图标
      default: null,
      type: String
    },
    MainHeaderRightText: { // 头部右边选项文本
      default: null,
      type: String
    },
    MainHeaderRightClick: { // 头部右边选项点击事件
      default: () => { },
      type: Function
    },
    MainTitleClick: { // 页面标题点击事件
      default: () => { },
      type: Function
    },
    ShowMainTitleIcon: { // 显隐页面标题箭头图标
      default: false,
      type: Boolean
    },
    ShowMainHeaderBack: { // 显隐头部返回按钮
      default: false,
      type: Boolean
    },
    MainTabBar: { // tabbar列表
      default: () => {
        return [
          { name: '首页', icon: 'iconcaipiao', id: 1, router: 'ShouYe' },
          { name: '开奖展示', icon: 'iconjiangbei', id: 2, router: 'KaiJiangZhanShi' },
          { name: '我的', icon: 'iconwode', id: 3, router: 'WoDe' }
        ]
      },
      type: Array
    },
    MainTabBarActiveId: { // tabbar选中id
      default: null,
      type: Number
    },
    ShowMainHeader: { // 显隐页面头部
      default: false,
      type: Boolean
    },
    ShowMainTabBar: { // 显隐页面tabbar
      default: false,
      type: Boolean
    },
    MainPaddingTop: { // 页面padding-top（不与系统顶部时间栏重叠）
      default: null,
      type: Number
    },
    MainPaddingBottom: { // 页面padding-bottom（不与系统底部返回栏重叠）
      default: null,
      type: Number
    },
    MainHeaderTitle: { // 页面title
      default: null,
      type: String
    }
  },
  data () {
    return {
      Timer: null
    }
  },
  computed: {
    ...mapState({
      FootballKeys: x => x.FootballKeys // 竞彩字典
    }),
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    })
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
    ...mapActions([
      'GetFootballKeys',
      'GetAllLotteryType'
    ]),
    ...mapMutations([
      'EditMainData'
    ]),
    ...mapUserActions([
      'SignIn'
    ]),
    Init () { // 初始化
      if (this.UserInfo === null) {
        if (window.localStorage.niucaiusername && window.localStorage.niucaiuserpassword) {
          this.SignIn({ data: { password: md5(window.localStorage.niucaiuserpassword), userName: window.localStorage.niucaiusername } }).then((res) => { // 登录
            if (this.UserInfo === null) {
              this.$router.push({ name: 'SignIn' })
            } else {
              this.GetFootballKeys() // 获取足彩相关字典
              this.GetAllLotteryType({ queryData: { pageNum: 1, pageSize: 1000 } })
              this.$emit('UserInfoChange')
            }
          }).catch(() => {
            this.$router.push({ name: 'SignIn' })
          })
        } else {
          this.$router.push({ name: 'SignIn' })
        }
      } else {
        if (this.FootballKeys === null) {
          this.GetFootballKeys() // 获取足彩相关字典
        }
        this.$emit('UserInfoChange')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
