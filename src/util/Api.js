
const prefix = '/api'

const $api = {
  UploadBase64Img: { // 上传base64图片
    method: 'post',
    url: `${prefix}/app/base64`
  },
  NewBindAliPay: { // 绑定支付宝（新）
    method: 'post',
    url: `${prefix}/app/:id/ali-pay`
  },
  AliPay: { // 支付宝支付
    method: 'post',
    url: `${prefix}/app/alipay/deposit`
  },
  ResetPassword: { // 重置密码
    method: 'put',
    url: `${prefix}/app/reset-password`
  },
  EditPassword: { // 修改密码
    method: 'put',
    url: `${prefix}/app/change-password`
  },
  GetCurrentUserInfo: { // 获取当前用户信息
    method: 'get',
    url: `${prefix}/app/customer/current`
  },
  BindAliAccount: { // 绑定支付宝
    method: 'post',
    url: `${prefix}/shop/alipay/auth/user`
  },
  BindIdCard: { // 绑定身份证
    method: 'put',
    url: `${prefix}/app/bind/identity`
  },
  CashOut: { // 提现
    method: 'post',
    url: `${prefix}/app/account/cashout`
  },
  GetAccountBill: { // 获取账户明细
    method: 'get',
    url: `${prefix}/app/customer/:id/bill`
  },
  CreateAliPayOrder: { // 创建支付宝订单
    method: 'get',
    url: `${prefix}/app/order/alipay/buylottery`
  },
  SignIn: { // 登录
    method: 'post',
    url: `${prefix}/app/login`
  },
  GetBanner: { // 获取banner
    method: 'get',
    url: `${prefix}/app/banner`
  },
  GetFootballKeys: { // 获取足彩相关字典
    method: 'get',
    url: `${prefix}/app/dict/football`
  },
  GetLotterySportRes: { // 获取竞彩开奖结果列表
    method: 'get',
    url: `${prefix}/app/sport/result`
  },
  GetLotteryRes: { // 获取数字彩开奖结果列表
    method: 'get',
    url: `${prefix}/app/lottery/result`
  },
  GetNewstLotteryRes: { // 获取最新数字彩开奖结果列表（不区分数字彩彩种）
    method: 'get',
    url: `${prefix}/app/lottery/result/last`
  },
  GetNewstSportsRes: { // 获取最新竞彩开奖结果列表（不区分彩种）
    method: 'get',
    url: `${prefix}/app/sport/result/last`
  },
  GetAllLotteryType: { // 获取所有彩种类型
    method: 'get',
    url: `${prefix}/app/lottery`
  },
  PostBetting: { // 下注
    method: 'post',
    url: `${prefix}/app/:id/betting`
  },
  GetStoreList: { // 获取店铺列表
    method: 'get',
    url: `${prefix}/app/shop/available`
  },
  GetUserBettingList: { // 获取用户投注列表
    method: 'get',
    url: `${prefix}/app/customer/betting/list`
  },
  UserRegister: { // 注册
    method: 'post',
    url: `${prefix}/app/signup`
  },
  GetRegPhoneCode: { // 注册获取手机验证码
    method: 'get',
    url: `${prefix}/app/sms/captcha/:phone`
  },
  CheckRegPhoneCode: { // 校验注册手机验证码
    method: 'post',
    url: `${prefix}/app/sms/captcha/:phone`
  },
  GetBettingDetail: { // 获取投注详情
    method: 'get',
    url: `${prefix}/app/customer/betting/:id`
  },
  GetMixData: { // 获取混合比赛数据
    method: 'get',
    url: `${prefix}/app/sport/current`
  },
  ImgUpload: { // 图片上传
    method: 'post',
    url: `${prefix}/:plat/image`
  },
  UpdateUserInfo: { // 更新用户信息
    method: 'put',
    url: `${prefix}/app/customer/:id`
  },
  GetAliPayStatus: { // 获取支付宝支付结果
    method: 'get',
    url: `${prefix}/app/order/:id/paystatus`
  }
}

export default $api
