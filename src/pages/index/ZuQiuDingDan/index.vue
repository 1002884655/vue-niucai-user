<template>
  <div class="Page">
    <MainPageContainer :GoBack="() => { $router.replace({ name: 'ZuQiu' }) }" :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="足球">
      <div class="PageContainer flex-v">
        <div class="flex-item">
          <div>

            <ul>
              <li v-for="(item, index) in PageList" :key="index">
                <a class="iconfont iconguanbi Close" @click="DeleteItem(index)"></a>
                <div class="Title flex-h">
                  <span>{{item.id}}</span>
                  <div class="flex-item">
                    <div>
                      <span>{{item.homeTeamName}} VS {{item.awayTeamName}}</span>
                    </div>
                  </div>
                </div>
                <div class="List A">
                  <span v-for="(subItem, subIndex) in item.list" :key="subIndex">{{subItem.name}}</span>
                </div>
              </li>
            </ul>

            <div class="OtherTab">
              <div>
                <div class="flex-h">
                  <span class="flex-item">加倍</span>
                  <span>
                    <a class="iconfont iconjianhao" @click="Multiple = Multiple > 1 ? Multiple - 1 : 1; TotalPrice = TotalCount * 200 * Multiple"></a>
                    <input type="number" disabled="disabled" v-model="Multiple">
                    <span>倍</span>
                    <a class="iconfont iconjiahao" @click="Multiple += 1; TotalPrice = TotalCount * 200 * Multiple"></a>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="Bottom">
          <div class="Store">
            <a @click="() => { if (GetStoreListStatus) { ShowStore = true } }">店铺：{{GetStoreListStatus ? CurrentStoreName === null ? '请选择' : CurrentStoreName : '正在请求店铺数据...'}} <i class="iconfont iconjiantoudown"></i></a>
          </div>
          <div class="Chuan" v-if="$route.query.type === 'mix'">
            <span @click="ShowPassWay = true">{{CurrentPassName || '请选择过关方式'}} <i class="iconfont iconjiantoudown"></i></span>
          </div>
          <div class="Count">
            <span>
              <em>{{TotalCount}}</em>注
            </span>
            <span>金额：<em>{{TotalPrice}}</em>牛币</span>
            <span>预计奖金：<em>{{(MinPrice * Multiple).toFixed(0)}} ~ {{(MaxPrice * Multiple).toFixed(0)}}</em>牛币</span>
          </div>
          <a :class="{'active': CurrentStoreId !== null && ZuQiuCart.length && CurrentPassCode !== null}" @click="ConfirmBetting">立即购买</a>
        </div>

        <div class="Layer" v-if="ShowPassWay">
          <div class="centerLabel">
            <span>自由过关</span>
            <nav>
              <a v-for="(item, index) in FootballKeys.passes" ref="ZiYouItem" :key="index" v-if="item.unitNum <= PageList.length && item.unitNum > 1 && item.amount === 1" :class="{'active': item.passCode === CurrentPassCode}" @click="CutPassCode(item)">{{item.name}}</a>
            </nav>
            <span>多串过关</span>
            <nav>
              <a v-for="(item, index) in FootballKeys.passes" :key="index" v-if="item.unitNum <= PageList.length && item.unitNum > 2 && item.amount !== 1" :class="{'active': item.passCode === CurrentPassCode}" @click="CutPassCode(item)">{{item.name}}</a>
            </nav>
            <div class="Bottom flex-h">
              <a class="flex-item" @click="ShowPassWay = false">取消</a>
              <a class="flex-item active" @click="ShowPassWay = false">确定</a>
            </div>
          </div>
        </div>

        <div class="Layer" v-if="ShowStore">
          <div class="centerLabel">
            <span v-if="MyStoreList.length">我的店铺：</span>
            <ul v-if="MyStoreList.length">
              <li v-for="(item, index) in MyStoreList" :key="index" v-if="item.status - 0 === 1" class="flex-h" @click="SelectStore(item)">
                <div class="flex-item">
                  <div>
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <span>{{ToolClass.Distance(Lat, Lng, item.lat, item.lng)}}km</span>
                <i class="iconfont iconweigouxuan" v-if="item.shopId !== CurrentStoreId"></i>
                <i class="iconfont iconyigouxuan active" v-else></i>
              </li>
            </ul>
            <span v-if="RecommendStoreList.length">推荐店铺：</span>
            <ul v-if="RecommendStoreList.length">
              <li v-for="(item, index) in RecommendStoreList" :key="index" class="flex-h" @click="SelectStore(item)">
                <div class="flex-item">
                  <div>
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <span>{{ToolClass.Distance(Lat, Lng, item.lat, item.lng)}}km</span>
                <i class="iconfont iconweigouxuan" v-if="item.shopId !== CurrentStoreId"></i>
                <i class="iconfont iconyigouxuan active" v-else></i>
              </li>
            </ul>
            <span>选择附近店铺：</span>
            <ul class="ScrollList">
              <li v-for="(item, index) in StoreList" :key="index" class="flex-h" @click="SelectStore(item)">
                <div class="flex-item">
                  <div>
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <span>{{ToolClass.Distance(Lat, Lng, item.lat, item.lng)}}km</span>
                <i class="iconfont iconweigouxuan" v-if="item.shopId !== CurrentStoreId"></i>
                <i class="iconfont iconyigouxuan active" v-else></i>
              </li>
            </ul>
            <div class="Bottom flex-h">
              <a class="flex-item" @click="CurrentStoreId = null; CurrentStoreName = null; ShowStore = false">取消</a>
              <a class="flex-item active" @click="ShowStore = false">确定</a>
            </div>
          </div>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { Switch } from 'vant'
import GetAllParts from '../../../util/Sports'
import GetPrice from '../../../util/FootballPrice'
import { mapState, createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      Lat: '',
      Lng: '',
      GetStoreListStatus: false,
      MyStoreList: [],
      PriceArr: [0, 0], // 奖金区间
      AllParts: [], // 投注生成结果
      CurrentPassUnitNum: 0,
      CurrentPassAmount: 0,
      CurrentPassCode: null, // 当前串法id
      CurrentPassName: null, // 当前串法名称
      ShowPassWay: false, // 显隐串法选择弹窗
      CurrentStoreName: null, // 当前选择店铺名称
      CurrentStoreId: null, // 当前选择店铺id
      RecommendStoreList: [], // 推荐店铺列表
      StoreList: [], // 店铺列表
      Multiple: 1, // 倍数
      ShowStore: false, // 是否显示店铺选择弹窗
      TotalCount: 0, // 总注数
      TotalPrice: 0, // 总金额
      PageList: [],
      DataLock: false,
      MaxPrice: 0,
      MinPrice: 0
    }
  },
  computed: {
    ...mapState({
      FootballKeys: x => x.FootballKeys // 竞彩字典
    }),
    ...mapUserState({
      UserInfo: x => x.UserInfo, // 用户信息
      ZuQiuCart: x => x.ZuQiuCart // 篮球购物车
    })
  },
  components: {
    'van-switch': Switch,
    MainPageContainer
  },
  created () {
    this.Init()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      'DeleteZuQiuCart',
      'EmptyZuQiuCart',
      'UpdateCart'
    ]),
    ...mapUserActions([
      'PostBetting',
      'GetStoreList',
      'GetCurrentUserInfo'
    ]),
    Init () { // 初始化
      if (this.ZuQiuCart.length) {
        window.localStorage.ZuQiuCart = JSON.stringify(this.ZuQiuCart)
      } else if (window.localStorage.ZuQiuCart !== undefined && window.localStorage.ZuQiuCart !== null) {
        this.UpdateCart({ name: 'ZuQiuCart', value: JSON.parse(window.localStorage.ZuQiuCart) || [] })
        if (window.localStorage.niucaiselectstoreid !== 'null' && window.localStorage.niucaiselectstoreid !== undefined) {
          this.CurrentStoreId = window.localStorage.niucaiselectstoreid - 0
          this.CurrentStoreName = window.localStorage.niucaiselectstorename
        }
      }
      this.PageList = [...this.ZuQiuCart] // 赋值页面数据
      let map = new window.BMap.Geolocation()
      let _that = this
      map.getCurrentPosition(function (res) {
        if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
          _that.Lat = res.point.lat
          _that.Lng = res.point.lng
          _that.ToGetStoreList()
        } else {
          _that.Toast('定位失败，请重新定位')
          console.log('failed' + this.getStatus())
        }
      }, { enableHighAccuracy: true })
      if (this.CurrentPassCode === null) {
        for (let n = 0; n < this.FootballKeys.passes.length; n++) {
          if (this.FootballKeys.passes[n].unitNum > 1 && this.FootballKeys.passes[n].amount === 1 && this.FootballKeys.passes[n].unitNum <= this.PageList.length) {
            this.CutPassCode(this.FootballKeys.passes[n])
            break
          }
        }
      }
      if (this.$route.query.type === 'single') { // 单关
        this.CurrentPassCode = '1＊1'
        this.ToGetAllParts() // 枚举投注
      }
    },
    ConfirmBetting () {
      if (this.DataLock || !this.ZuQiuCart.length || this.CurrentStoreId === null || this.CurrentPassCode === null) return
      this.Dialog.confirm({
        title: '确认投注',
        message: `您将花费${this.TotalPrice}牛币进行投注，目前账户余额${this.UserInfo.account.amount}牛币`,
        beforeClose: this.BettingBeforeClose
      })
    },
    BettingBeforeClose (action, done) {
      if (action === 'confirm') {
        this.ToPostBetting(done)
      } else {
        done()
      }
    },
    ToPostBetting (done = () => { }) { // 去下注
      if (this.DataLock || !this.ZuQiuCart.length || this.CurrentStoreId === null || this.CurrentPassCode === null) return
      this.DataLock = true
      let Data = null
      let ListData = []
      this.ZuQiuCart.map((item) => {
        ListData.push({
          matchId: item.id,
          awayTeamId: item.awayTeamId, // 客队id
          awayTeamName: item.awayTeamName, // 客队名称
          homeTeamId: item.homeTeamId, // 主队id
          homeTeamName: item.homeTeamName, // 主队名称
          detailList: this.ReturnDeatilList(item.list, item.id)
        })
      })
      Data = {
        expectedEarning: `${this.MinPrice}~${this.MaxPrice}牛币`, // 预期奖金
        customerId: this.UserInfo.customerId, // 用户id
        isDigit: false, // 是否数字彩
        isSport: true, // 是否体彩
        itemList: [...ListData], // 购彩方案
        lotteryId: 'football', // 彩种ID
        notesNum: this.TotalCount, // 总注数
        passCode: this.CurrentPassCode, // 过关方式
        shopId: this.CurrentStoreId, // 店铺ID
        times: this.Multiple, // 倍数
        totalPrice: this.TotalPrice // 总金额
      }
      this.PostBetting({
        urlData: { id: 'football' },
        data: { ...Data }
      }).then((res) => {
        done()
        this.Toast('投注成功！')
        this.EmptyZuQiuCart()
        this.PageList = []
        this.PriceArr = [0, 0]
        this.TotalCount = 0
        this.TotalPrice = 0
        this.Multiple = 1
        this.DataLock = false
        this.GetCurrentUserInfo().then(() => {
          this.$router.push({ name: 'DingDanZhiFuZhuangTai', query: { orderId: res.data.data.orderId, bettingId: res.data.data.bettingId, routerName: 'ZuQiu' } })
        })
      }).catch((res) => {
        done()
        this.Toast(res.data.message || `未知错误，错误代码：${res.data.code}`)
        this.DataLock = false
        if (res.data.code - 0 === 1003) {
          this.$router.push({ name: 'ChongZhi', query: { from: 'ZuQiuDingDan' } })
        }
      })
    },
    ToGetStoreList () { // 获取店铺列表
      this.GetStoreListStatus = false
      this.GetStoreList({
        queryData: {
          location: `${this.Lng},${this.Lat}`,
          lotteryId: 'football'
        }
      }).then((res) => {
        let StoreList = res.data.data.nearest || []
        let RecommendStoreList = res.data.data.recommend || []
        let MyStoreList = []
        if (res.data.data.mine !== null) {
          MyStoreList = [{ ...res.data.data.mine }]
        }
        StoreList.map((item) => {
          if (item.status - 0 === 1) {
            this.StoreList.push(item)
          }
        })
        RecommendStoreList.map((item) => {
          if (item.status - 0 === 1) {
            this.RecommendStoreList.push(item)
          }
        })
        MyStoreList.map((item) => {
          if (item.status - 0 === 1) {
            this.MyStoreList.push(item)
          }
        })
        if (this.CurrentStoreId === null) {
          if (this.MyStoreList.length) {
            this.CurrentStoreName = this.MyStoreList[0].shopId === this.CurrentStoreId ? null : this.MyStoreList[0].name
            this.CurrentStoreId = this.MyStoreList[0].shopId === this.CurrentStoreId ? null : this.MyStoreList[0].shopId
          } else if (this.RecommendStoreList.length) {
            this.CurrentStoreName = this.RecommendStoreList[0].shopId === this.CurrentStoreId ? null : this.RecommendStoreList[0].name
            this.CurrentStoreId = this.RecommendStoreList[0].shopId === this.CurrentStoreId ? null : this.RecommendStoreList[0].shopId
          } else if (this.StoreList.length) {
            this.CurrentStoreName = this.StoreList[0].shopId === this.CurrentStoreId ? null : this.StoreList[0].name
            this.CurrentStoreId = this.StoreList[0].shopId === this.CurrentStoreId ? null : this.StoreList[0].shopId
          }
          if (this.CurrentStoreId !== null) {
            window.localStorage.niucaiselectstoreid = this.CurrentStoreId
            window.localStorage.niucaiselectstorename = this.CurrentStoreName
          }
        }
        this.GetStoreListStatus = true
      }).catch((res) => {
      })
    },
    ToGetAllParts () { // 枚举投注
      let ListData = []
      this.ZuQiuCart.map((item) => {
        ListData.push({
          matchId: item.id,
          spreadPoints: item.rq,
          presetPoints: item.ys,
          awayTeamId: item.awayTeamId, // 客队id
          awayTeamName: item.awayTeamName, // 客队名称
          homeTeamId: item.homeTeamId, // 主队id
          homeTeamName: item.homeTeamName, // 主队名称
          amount: this.Multiple * item.list.length, // 购买注数
          charges: this.Multiple * 2, // 价格
          detailList: this.ReturnDeatilList(item.list, item.id)
        })
      })
      let PassTarget = null
      this.FootballKeys.passes.map((item) => {
        if (item.passCode === this.CurrentPassCode) {
          PassTarget = item
        }
      })
      this.AllParts = GetAllParts([...ListData], PassTarget).allParts
      if (this.CurrentPassCode === '1＊1') {
        let Count = 1
        this.AllParts.map((item) => {
          item.map((subItem) => {
            Count *= subItem.length
          })
        })
        this.TotalCount = Count
      } else {
        this.TotalCount = GetAllParts([...ListData], PassTarget).sum
      }
      this.TotalPrice = this.TotalCount * 200 * this.Multiple
      this.PriceArr = GetPrice(this.AllParts)
      let ResArr = []
      this.AllParts.map((item, index) => {
        ResArr.push([])
        item.map((subItem, subIndex) => {
          ResArr[index].push([])
          subItem.map((cItem) => {
            ResArr[index][subIndex].push({ odds: cItem.detail.odds - 0, id: cItem.matchId, ruleCode: cItem.detail.ruleCode })
          })
        })
      })
      let MaxPrice = 0
      let PrevPrice = null
      ResArr.map((item, index) => {
        let subItemPrice = 1
        item.map((subItem, subIndex) => {
          subItem.map((cItem) => {
            subItemPrice *= cItem.odds
          })
          subItemPrice *= 2
          if (PrevPrice === null || PrevPrice > subItemPrice) {
            PrevPrice = subItemPrice - 0
          }
        })
        MaxPrice += subItemPrice
      })
      this.MaxPrice = (MaxPrice * 100).toFixed(0)
      this.MinPrice = (PrevPrice * 100).toFixed(0)
    },
    ReturnDeatilList (list, pid) {
      let Arr = []
      list.map((item) => {
        Arr.push({
          matchId: pid,
          odds: item.odds,
          ruleCode: item.ruleCode,
          wayCode: item.wayCode
        })
      })
      return Arr || []
    },
    CutPassCode (item) { // 切换串法
      if (this.DataLock) return
      this.DataLock = true
      if (this.CurrentPassCode === item.passCode) {
        this.CurrentPassCode = null
        this.CurrentPassName = null
        this.CurrentPassUnitNum = 0
        this.CurrentPassAmount = 0
        this.TotalCount = 0
        this.TotalPrice = 0
        this.PriceArr = [0, 0]
      } else {
        this.CurrentPassCode = item.passCode
        this.CurrentPassName = item.name
        this.CurrentPassUnitNum = item.unitNum
        this.CurrentPassAmount = item.amount
        this.ToGetAllParts()
      }
      this.DataLock = false
    },
    SelectStore (item) { // 选择店铺
      if (this.DataLock) return
      this.DataLock = true
      this.CurrentStoreName = item.shopId === this.CurrentStoreId ? null : item.name
      this.CurrentStoreId = item.shopId === this.CurrentStoreId ? null : item.shopId
      window.localStorage.niucaiselectstoreid = this.CurrentStoreId
      window.localStorage.niucaiselectstorename = this.CurrentStoreName
      this.DataLock = false
    },
    DeleteItem (index) { // 删除投注
      if (this.DataLock) return
      this.DataLock = true
      this.DeleteZuQiuCart(index)
      this.PageList = [...this.ZuQiuCart]
      window.localStorage.ZuQiuCart = JSON.stringify(this.ZuQiuCart)
      if (this.$route.query.type === 'mix') {
        this.CurrentPassCode = null
        this.CurrentPassName = null
      }
      this.TotalPrice = 0
      this.TotalCount = 0
      this.PriceArr = [0, 0]
      this.MaxPrice = 0
      this.MinPrice = 0
      this.DataLock = false
    },
    MultipleLess (item) { // 减少倍数
      if (item.Multiple > 1 && !this.DataLock) {
        this.DataLock = true
        item.Multiple -= 1
        this.TotalPrice = this.TotalCount * 200 * this.Multiple
        this.DataLock = false
      }
    },
    MultipleMore (item) { // 增加倍数
      if (!this.DataLock) {
        this.DataLock = true
        item.Multiple += 1
        this.TotalPrice = this.TotalCount * 200 * this.Multiple
        this.DataLock = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
