
import Api from '../../util/Api'
import ToolClass from '../../util/PublicMethod'
export default {
  namespaced: true,
  state: {
    LotterySportRes: [],
    NewstSportsRes: [], // 最新竞彩开奖结果列表
    Banner: [], // banner
    LotteryRes: [], // 数字彩开奖结果列表
    NewstLotteryRes: [] // 最新数字彩开奖结果列表
  },
  mutations: {
    UpdateBanner (state, data) { // 更新banner
      state.Banner = data.records || []
    },
    EmptyBanner (state) { // 清空banner
      state.Banner = []
    },
    UpdateLotteryRes (state, data) { // 更新数字彩开奖结果列表
      // state.LotteryRes = data.records || []
      let Arr = data.records || []
      Arr.map((item) => {
        state.LotteryRes.push(item)
      })
    },
    EmptyLotteryRes (state) { // 清空数字彩开奖结果列表
      state.LotteryRes = []
    },
    UpdateNewstLotteryRes (state, data) { // 更新最新数字彩开奖结果列表
      state.NewstLotteryRes = data || []
    },
    UpdateNewstSportsRes (state, data) { // 更新最新竞彩开奖结果列表
      state.NewstSportsRes = data || []
    },
    UpdateLotterySportRes (state, data) { // 更新竞彩开奖结果列表
      let Arr = data.records || []
      Arr.map((item) => {
        state.LotterySportRes.push(item)
      })
    },
    EmptyLotterySportRes (state) { // 清空竞彩开奖结果列表
      state.LotterySportRes = []
    }
  },
  actions: {
    GetBanner (context, payload) { // 获取banner
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetBanner, context, payload, 1000, 'UpdateBanner')
      })
    },
    GetLotteryRes (context, payload) { // 获取数字彩开奖结果列表
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetLotteryRes, context, payload, 1000, 'UpdateLotteryRes')
      })
    },
    GetNewstLotteryRes (context, payload) { // 获取最新数字彩开奖结果列表
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetNewstLotteryRes, context, payload, 1000, 'UpdateNewstLotteryRes')
      })
    },
    GetNewstSportsRes (context, payload) { // 获取最新竞彩开奖结果列表（不区分彩种）
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetNewstSportsRes, context, payload, 1000, 'UpdateNewstSportsRes')
      })
    },
    GetLotterySportRes (context, payload) { // 获取竞彩开奖结果列表
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetLotterySportRes, context, payload, 1000, 'UpdateLotterySportRes')
      })
    }
  }
}
