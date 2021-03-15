<template>
  <div class="Page">
    <MainPageContainer :GoBack="() => { $router.replace({ name: 'PaiLie5' }) }" :ShowMainHeader="true" :ShowMainHeaderRight="true" MainHeaderRightIcon="iconqingkong" MainHeaderRightText="清空重选" :ShowMainHeaderBack="true" MainHeaderTitle="确认投注" :MainHeaderRightClick="() => { this.EmptyCart() }">
      <div class="PageContainer flex-v">
        <a class="Store flex-h" @click="() => { if (GetStoreListStatus) { ShowStore = true } }">
          <div class="flex-item">
            <div>
              <span>投注门店：{{GetStoreListStatus ? CurrentStoreName === null ? '请选择' : CurrentStoreName : '正在请求店铺数据...'}}</span>
            </div>
          </div>
          <span>查看更多</span>
          <i class="iconfont iconjiantouright"></i>
        </a>

        <div class="flex-item">
          <div>

            <div class="Title">
              <span>订单信息</span>
            </div>

            <span v-if="!PageList.length">购物车空空如也</span>

            <ul>
              <li v-for="(item, index) in PageList" :key="index">
                <a class="iconfont iconguanbi Close" @click="DeleteItem(item, index)"></a>
                <div class="Title">
                  <span>{{item.Type === 'Random' ? '机选' : '自选'}}普通</span>
                  <span>{{item.Count}}注{{item.Count * 2}}牛币</span>
                </div>
                <ul>
                  <li v-for="(subItem, subIndex) in item.WanWei" :key="`WanWei-${subIndex}`">
                    <div class="centerLabel">
                      <span>{{subItem}}</span>
                      <span>万</span>
                    </div>
                  </li>
                  <li v-for="(subItem, subIndex) in item.QianWei" :key="`QianWei-${subIndex}`">
                    <div class="centerLabel">
                      <span>{{subItem}}</span>
                      <span>千</span>
                    </div>
                  </li>
                  <li v-for="(subItem, subIndex) in item.BaiWei" :key="`BaiWei-${subIndex}`">
                    <div class="centerLabel">
                      <span>{{subItem}}</span>
                      <span>百</span>
                    </div>
                  </li>
                  <li v-for="(subItem, subIndex) in item.ShiWei" :key="`ShiWei-${subIndex}`">
                    <div class="centerLabel">
                      <span>{{subItem}}</span>
                      <span>十</span>
                    </div>
                  </li>
                  <li v-for="(subItem, subIndex) in item.GeWei" :key="`GeWei-${subIndex}`">
                    <div class="centerLabel">
                      <span>{{subItem}}</span>
                      <span>个</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>

            <div class="Tips">
              <span>排列五官方出票时间：</span>
              <span>周一至周五 9:00 ~ 24:00 周六周日 9:00 ~ 次日1:00</span>
            </div>

          </div>
        </div>

        <div class="Bottom">
          <div class="flex-h">
            <div class="flex-item">
              <div>
                <span><em>{{TotalCount}}</em>注<em>{{TotalCount * 200 * Multiple}}</em>牛币</span>
              </div>
            </div>
            <span>
              <a class="iconfont iconjianhao" @click="Multiple = Multiple > 1 ? Multiple - 1 : 1"></a>
              <input type="number" disabled="disabled" v-model="Multiple">
              <span>倍</span>
              <a class="iconfont iconjiahao" @click="Multiple += 1"></a>
            </span>
          </div>
          <div class="flex-h">
            <a @click="$router.go(-1)">自选号码</a>
            <a @click="CutRandomCount(1)">机选一注</a>
            <a class="flex-item" @click="ConfirmBetting" :class="{'active': CurrentStoreId !== null && PaiLie5Cart.length}">确认投注</a>
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
              <li v-for="(item, index) in RecommendStoreList" :key="index" v-if="item.status - 0 === 1" class="flex-h" @click="SelectStore(item)">
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
              <li v-for="(item, index) in StoreList" :key="index" v-if="item.status - 0 === 1" class="flex-h" @click="SelectStore(item)">
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
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      Lat: '',
      Lng: '',
      GetStoreListStatus: false,
      MyStoreList: [],
      CurrentStoreName: null, // 当前选择店铺名称
      CurrentStoreId: null, // 当前选择店铺id
      RecommendStoreList: [], // 推荐店铺列表
      StoreList: [], // 店铺列表
      ShowStore: false,
      Multiple: 1,
      TotalCount: 0,
      DataLock: false,
      PageList: [],
      NumData: { // 选取数据
        WanWei: [],
        QianWei: [],
        ShiWei: [],
        BaiWei: [],
        GeWei: []
      }
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo, // 用户信息
      PaiLie5Cart: x => x.PaiLie5Cart
    })
  },
  components: {
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
      'AddPaiLie5Cart',
      'DeletePaiLie5Cart',
      'EmptyPaiLie5Cart',
      'UpdateCart'
    ]),
    ...mapUserActions([
      'PostBetting',
      'GetStoreList',
      'GetCurrentUserInfo'
    ]),
    Init () { // 初始化
      if (this.PaiLie5Cart.length) {
        window.localStorage.PaiLie5Cart = JSON.stringify(this.PaiLie5Cart)
      } else if (window.localStorage.PaiLie5Cart !== undefined && window.localStorage.PaiLie5Cart !== null) {
        this.UpdateCart({ name: 'PaiLie5Cart', value: JSON.parse(window.localStorage.PaiLie5Cart) || [] })
        if (window.localStorage.niucaiselectstoreid !== 'null' && window.localStorage.niucaiselectstoreid !== undefined) {
          this.CurrentStoreId = window.localStorage.niucaiselectstoreid - 0
          this.CurrentStoreName = window.localStorage.niucaiselectstorename
        }
      }
      this.PageList = [...this.PaiLie5Cart]
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
      this.CalcTotalCount()
      this.CreateData()
    },
    ToGetStoreList () {
      this.GetStoreListStatus = false
      this.GetStoreList({
        queryData: {
          location: `${this.Lng},${this.Lat}`,
          lotteryId: 'p5'
        }
      }).then((res) => {
        this.StoreList = res.data.data.nearest || []
        this.RecommendStoreList = res.data.data.recommend || []
        if (res.data.data.mine !== null) {
          this.MyStoreList = [{ ...res.data.data.mine }]
        }
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
      })
    },
    ConfirmBetting () {
      if (this.DataLock || !this.PaiLie5Cart.length || this.CurrentStoreId === null) return
      this.Dialog.confirm({
        title: '确认投注',
        message: `您将花费${this.TotalCount * 200 * this.Multiple}牛币进行投注，目前账户余额${this.UserInfo.account.amount}牛币`,
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
      if (this.DataLock || !this.PaiLie5Cart.length || this.CurrentStoreId === null) return
      this.DataLock = true
      let ListData = []
      this.PaiLie5Cart.map((item) => {
        let ItemArr = ['', '', '', '', '']
        // for (let key in item) {
        //   if (key !== 'Count' && key !== 'Type') {
        //     ItemArr.push(item[key])
        //   }
        // }
        // ItemArr.sort((a, b) => { return a - b })
        ItemArr[0] = item.WanWei.join(' ')
        ItemArr[1] = item.QianWei.join(' ')
        ItemArr[2] = item.BaiWei.join(' ')
        ItemArr[3] = item.ShiWei.join(' ')
        ItemArr[4] = item.GeWei.join(' ')
        ListData.push({
          amount: item.Count, // 购买注数
          charges: item.Count * 200, // 价格
          firstDan: '', // 前区胆号, 逗号连接
          firstNums: ItemArr.join(','), // 前区其余数字, 逗号连接
          isDan: false, // 是否胆拖
          isMulti: item.Count > 1 // 是否复式
          // secondDan: item.LastRes.Dan.join(','), // 后区胆号, 逗号连接
          // secondNums: item.LastRes.Tuo.join(',') // 后区其余数字, 逗号连接
        })
      })
      let Data = {
        itemList: [...ListData], // 这个是详细购买方案的列表
        lotteryId: 'p5', // 彩种ID
        notesNum: this.TotalCount, // 总注数
        shopId: this.CurrentStoreId, // 店铺ID
        times: this.Multiple, // 倍数
        totalPrice: this.TotalCount * 200 * this.Multiple // 总金额
      }
      this.PostBetting({
        urlData: { id: 'p5' },
        data: { ...Data }
      }).then((res) => {
        done()
        this.Toast('投注成功！')
        this.EmptyPaiLie5Cart()
        this.PageList = []
        this.TotalCount = 0
        this.Multiple = 1
        this.DataLock = false
        this.GetCurrentUserInfo().then(() => {
          this.$router.push({ name: 'DingDanZhiFuZhuangTai', query: { orderId: res.data.data.orderId, bettingId: res.data.data.bettingId, routerName: 'PaiLie5' } })
        })
      }).catch((res) => {
        done()
        this.Toast(res.data.message || `未知错误，错误代码：${res.data.code}`)
        this.DataLock = false
        if (res.data.code - 0 === 1003) {
          this.$router.push({ name: 'ChongZhi', query: { from: 'PaiLie5DingDan' } })
        }
      })
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
    EmptyCart () { // 清空购物车
      this.Dialog.confirm({
        message: '确认清空购物车？'
      }).then(() => {
        this.EmptyPaiLie5Cart()
        this.PageList = []
        this.TotalCount = 0
      })
    },
    CalcTotalCount () { // 计算总注数
      this.TotalCount = 0
      this.PageList.map((item) => {
        this.TotalCount += item.Count
      })
    },
    DeleteItem (item, index) { // 删除单注
      if (this.DataLock) return
      this.DataLock = true
      this.DeletePaiLie5Cart(index)
      this.PageList.splice(index, 1)
      window.localStorage.PaiLie5Cart = JSON.stringify(this.PaiLie5Cart)
      this.TotalCount -= item.Count
      this.DataLock = false
    },
    CreateData () { // 创建数据
      for (let key in this.NumData) {
        this.NumData[key] = []
      }
      for (let n = 0; n < 10; n++) {
        for (let key in this.NumData) {
          this.NumData[key].push({ Num: n, MissNum: 0, Active: false })
        }
      }
    },
    CutRandomCount (num) { // 切换机选注数
      if (this.DataLock) return
      this.DataLock = true
      for (let n = 0; n < num; n++) {
        let Res = {}
        for (let key in this.NumData) {
          Res[key] = [this.NumData[key][Math.floor(this.NumData[key].length * Math.random())].Num]
        }
        this.AddPaiLie5Cart({ ...Res, Count: 1, Type: 'Random' })
        this.PageList.unshift({ ...Res, Count: 1, Type: 'Random' })
      }
      this.CalcTotalCount()
      this.DataLock = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
