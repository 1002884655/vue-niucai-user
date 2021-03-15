
import Api from '../../util/Api'
import ToolClass from '../../util/PublicMethod'
export default {
  namespaced: true,
  state: {
    AccountBill: [], // 账户明细
    StoreList: [], // 店铺列表
    LanQiuCart: [], // 篮球购物车
    ZuQiuCart: [], // 足球购物车
    PaiLie3Cart: [], // 排列3购物车
    PaiLie5Cart: [], // 排列5购物车
    DaLeTouCart: [], // 大乐透购物车
    ShuangSeQiuCart: [], // 双色球购物车
    UserInfo: null, // 用户信息
    UserBettingList: [], // 用户投注列表
    UserAccountDetails: { // 用户账户明细
      All: [
        { type: '充值', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' },
        { type: '投注', id: '', createDate: '2020-08-15 12:00:00', amount: '-200' },
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' },
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' },
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' }
      ],
      Pay: [ // 充值
        { type: '充值', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' }
      ],
      Bet: [ // 投注
        { type: '投注', id: '', createDate: '2020-08-15 12:00:00', amount: '-200' }
      ],
      SendPrize: [], // 派奖
      WithDraw: [ // 提现
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' },
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' },
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' }
      ]
    }
  },
  mutations: {
    UpdateUserInfo (state, data) { // 更新用户信息
      state.UserInfo = data || null
    },
    EmptyUserInfo (state) { // 清空用户信息
      state.UserInfo = null
    },
    EditUserInfo (state, data) { // 编辑用户信息
      state.UserInfo[data.name] = data.value
    },
    AddDaLeTouCart (state, data) { // 新增大乐透购物车
      state.DaLeTouCart.push(data)
    },
    DeleteDaLeTouCart (state, data) { // 删除大乐透购物车
      state.DaLeTouCart.splice(data, 1)
    },
    EmptyDaLeTouCart (state, data) { // 清空大乐透购物车
      state.DaLeTouCart = []
    },
    AddShuangSeQiuCart (state, data) { // 新增双色球购物车
      state.ShuangSeQiuCart.push(data)
    },
    DeleteShuangSeQiuCart (state, data) { // 删除双色球购物车
      state.ShuangSeQiuCart.splice(data, 1)
    },
    EmptyShuangSeQiuCart (state, data) { // 清空双色球购物车
      state.ShuangSeQiuCart = []
    },
    AddPaiLie3Cart (state, data) { // 新增排列3购物车
      state.PaiLie3Cart.push(data)
    },
    DeletePaiLie3Cart (state, data) { // 删除排列3购物车
      state.PaiLie3Cart.splice(data, 1)
    },
    EmptyPaiLie3Cart (state, data) { // 清空排列3购物车
      state.PaiLie3Cart = []
    },
    AddPaiLie5Cart (state, data) { // 新增排列5购物车
      state.PaiLie5Cart.push(data)
    },
    DeletePaiLie5Cart (state, data) { // 删除排列5购物车
      state.PaiLie5Cart.splice(data, 1)
    },
    EmptyPaiLie5Cart (state, data) { // 清空排列5购物车
      state.PaiLie5Cart = []
    },
    AddLanQiuCart (state, data) { // 新增篮球购物车
      state.LanQiuCart.push(data)
    },
    DeleteLanQiuCart (state, data) { // 删除篮球购物车
      state.LanQiuCart.splice(data, 1)
    },
    EmptyLanQiuCart (state, data) { // 清空篮球购物车
      state.LanQiuCart = []
    },
    UpdateCart (state, data) { // 更新购物车
      state[data.name] = data.value || []
    },
    AddZuQiuCart (state, data) { // 新增足球购物车
      state.ZuQiuCart.push(data)
    },
    DeleteZuQiuCart (state, data) { // 删除足球购物车
      state.ZuQiuCart.splice(data, 1)
    },
    EmptyZuQiuCart (state, data) { // 清空足球购物车
      state.ZuQiuCart = []
    },
    UpdateStoreList (state, data) { // 更新店铺列表
      let Arr = data.nearest || []
      state.StoreList = []
      Arr.map((item) => {
        state.StoreList.push({ ...item, Active: false })
      })
    },
    UpdateUserBettingList (state, data) { // 更新用户投注列表
      state.UserBettingList = state.UserBettingList.concat(data.records || [])
    },
    EmptyUserBettingList (state) { // 清空用户投注列表
      state.UserBettingList = []
    },
    UpdateAccountBill (state, data) { // 更新账户明细
      state.AccountBill = state.AccountBill.concat(data.records || [])
    },
    EmptyAccountBill (state) { // 清空账户明细
      state.AccountBill = []
    }
  },
  actions: {
    UploadBase64Img (context, payload) { // 上传base64图片
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.UploadBase64Img, context, payload, 1000)
      })
    },
    NewBindAliPay (context, payload) { // 绑定支付宝（新）
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.NewBindAliPay, context, payload, 1000)
      })
    },
    AliPay (context, payload) { // 支付宝支付
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.AliPay, context, payload, 1000)
      })
    },
    ResetPassword (context, payload) { // 重置密码
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.ResetPassword, context, payload, 1000)
      })
    },
    EditPassword (context, payload) { // 修改密码
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.EditPassword, context, payload, 1000)
      })
    },
    GetCurrentUserInfo (context, payload) { // 获取当前用户信息
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetCurrentUserInfo, context, payload, 1000, 'UpdateUserInfo')
      })
    },
    BindAliAccount (context, payload) { // 绑定支付宝
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.BindAliAccount, context, payload, 1000)
      })
    },
    BindIdCard (context, payload) { // 绑定身份证
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.BindIdCard, context, payload, 1000)
      })
    },
    CashOut (context, payload) { // 提现
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.CashOut, context, payload, 1000)
      })
    },
    GetAccountBill (context, payload) { // 获取账户明细
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetAccountBill, context, payload, 1000, 'UpdateAccountBill')
      })
    },
    GetAliPayStatus (context, payload) { // 获取支付宝支付结果
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetAliPayStatus, context, payload, 1000)
      })
    },
    CreateAliPayOrder (context, payload) { // 创建支付宝订单
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.CreateAliPayOrder, context, payload, 1000)
      })
    },
    ImgUpload (context, payload) { // 上传图片
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.ImgUpload, context, payload, 1000)
      })
    },
    UpdateUserInfo (context, payload) { // 更新用户信息
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.UpdateUserInfo, context, payload, 1000)
      })
    },
    CheckRegPhoneCode (context, payload) { // 校验注册手机验证码
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.CheckRegPhoneCode, context, payload, 1000)
      })
    },
    GetRegPhoneCode (context, payload) { // 注册获取手机验证码
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetRegPhoneCode, context, payload, 1000)
      })
    },
    UserRegister (context, payload) { // 注册
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.UserRegister, context, payload, 1000)
      })
    },
    SignIn (context, payload) { // 登录
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.SignIn, context, payload, 1000, 'UpdateUserInfo')
      })
    },
    PostBetting (context, payload) { // 下注
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.PostBetting, context, payload, 1000)
      })
    },
    GetStoreList (context, payload) { // 获取店铺列表
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetStoreList, context, payload, 1000, 'UpdateStoreList')
      })
    },
    GetUserBettingList (context, payload) { // 获取用户投注列表
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetUserBettingList, context, payload, 1000, 'UpdateUserBettingList')
      })
    },
    GetBettingDetail (context, payload) { // 获取投注详情
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetBettingDetail, context, payload, 1000)
      })
    },
    GetMixData (context, payload) { // 获取混合比赛数据
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetMixData, context, payload, 1000)
      })
    }
  }
}
