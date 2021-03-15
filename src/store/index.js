/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

import Api from '../util/Api'
import ToolClass from '../util/PublicMethod'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    FirstComming: true,
    ShowSafariLayer: false,
    ShowMainHeaderRight: false, // 显隐头部右边选项
    MainHeaderRightIcon: null, // 头部右边选项图标
    MainHeaderRightText: null, // 头部右边选项文本
    MainHeaderRightClick: () => { }, // 头部右边选项点击事件
    MainTitleClick: () => { }, // 页面标题点击事件
    ShowMainTitleIcon: false, // 显隐页面标题箭头图标
    ShowMainHeaderBack: true, // 显隐头部返回按钮
    ShowMainHeader: false, // 显隐页面头部
    ShowMainTabBar: false, // 显隐页面tabbar
    MainPaddingTop: 0, // 页面padding-top（不与系统顶部时间栏重叠）
    MainPaddingBottom: 0, // 页面padding-bottom（不与系统底部返回栏重叠）
    MainHeaderTitle: '', // 页面title
    MainTabBar: [ // tabbar列表
      { name: '首页', icon: 'iconcaipiao', id: 1, router: 'ShouYe' },
      { name: '开奖展示', icon: 'iconjiangbei', id: 2, router: 'KaiJiangZhanShi' },
      { name: '我的', icon: 'iconwode', id: 3, router: 'WoDe' }
    ],
    MainTabBarActiveId: null, // tabbar选中id
    AllLotteryType: [], // 所有彩种类型
    FootballKeys: null // 足彩相关字典
  },
  mutations: {
    EditFirstComming (state, data) {
      state.FirstComming = data
    },
    EditSafariLayer (state, data) {
      state.ShowSafariLayer = data
    },
    UpdateFootballKeys (state, data) { // 更新足彩相关字典
      state.FootballKeys = data || null
    },
    UpdateAllLotteryType (state, data) { // 更新所有彩种类型
      let Arr = data.records || []
      Arr.map((item) => {
        if (item.lotteryId === 'basketball') {
          item.router = 'LanQiu'
          item.icon = 'icon6.png'
          item.desc = '玩转NBA'
        } else if (item.lotteryId === 'football') {
          item.router = 'ZuQiu'
          item.icon = 'icon3.png'
          item.desc = '精彩足球赛事'
        } else if (item.lotteryId === 'lottery') {
          item.router = 'DaLeTou'
          item.icon = 'icon4.png'
          item.desc = '喜提头等奖'
        } else if (item.lotteryId === 'double-color') {
          item.router = 'ShuangSeQiu'
          item.icon = 'icon5.png'
          item.desc = '2元可中1000w'
        } else if (item.lotteryId === 'p3') {
          item.router = 'PaiLie3'
          item.icon = 'icon7.png'
          item.desc = '最高可中1040'
        } else if (item.lotteryId === 'p5') {
          item.router = 'PaiLie5'
          item.icon = 'icon2.png'
          item.desc = '奖金可达10w'
        } else {
          item.router = ''
          item.icon = ''
          item.desc = ''
        }
      })
      state.AllLotteryType = Arr || []
    },
    EditMainData (state, data) { // 修改页面数据
      state.ShowMainHeaderRight = false
      state.MainHeaderRightIcon = null
      state.MainHeaderRightText = null
      state.MainHeaderRightClick = () => { }
      state.MainTitleClick = () => { }
      state.ShowMainHeader = false
      state.ShowMainTitleIcon = false
      state.ShowMainTabBar = false
      state.MainHeaderTitle = ''
      state.MainTabBarActiveId = null
      state.ShowMainHeaderBack = false
      if (data.length === undefined) {
        state[data.name] = data.value
      } else {
        data.map((item) => {
          state[item.name] = item.value
        })
      }
    },
    EditMainItemData (state, data) { // 修改页面数据
      state[data.name] = data.value
    }
  },
  actions: {
    GetFootballKeys (context, payload) { // 获取足彩相关字典
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetFootballKeys, context, payload, 1000, 'UpdateFootballKeys')
      })
    },
    GetAllLotteryType (context, payload) { // 获取所有彩种类型
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetAllLotteryType, context, payload, 1000, 'UpdateAllLotteryType')
      })
    }
  }
})
export const modules = {
  common: () => require('./common/index').default,
  index: () => require('./index/index').default,
  user: () => require('./user/index').default
}

Object.keys(modules).forEach((modKey) => {
  const modNS = modKey.split('/')
  const getMod = modules[modKey]
  store.registerModule(...modNS, getMod())
})

export default store
