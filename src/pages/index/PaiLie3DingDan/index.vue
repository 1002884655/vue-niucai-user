<template>
  <div class="Page">
    <MainPageContainer :GoBack="() => { $router.replace({ name: 'PaiLie3' }) }" :ShowMainHeader="true" :ShowMainHeaderRight="true" :ShowMainHeaderBack="true" MainHeaderRightIcon="iconqingkong" MainHeaderRightText="清空重选" MainHeaderTitle="确认投注" :MainHeaderRightClick="() => { this.EmptyCart() }">
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
                  <span>{{ReturnType(item.Type)}}</span>
                  <span>{{item.Count}}注{{item.Count * 200}}牛币</span>
                </div>

                <!-- 直选 -->
                <ul v-if="item.Type === 'ZhiXuan'">
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

                <!-- 组选3 -->
                <ul v-if="item.Type.indexOf('ZuXuan3') > -1">
                  <li v-for="(subItem, subIndex) in item.List" :key="subIndex">
                    <div class="centerLabel">
                      <span>{{subItem}}</span>
                    </div>
                  </li>
                </ul>

                <!-- 组选6 -->
                <ul v-if="item.Type === 'ZuXuan6'">
                  <li v-for="(subItem, subIndex) in item.List" :key="subIndex">
                    <div class="centerLabel">
                      <span>{{subItem}}</span>
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
            <a @click="RandomCount">机选一注</a>
            <a class="flex-item" @click="ConfirmBetting" :class="{'active': CurrentStoreId !== null && PaiLie3Cart.length}">确认投注</a>
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
      PageList: []
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo, // 用户信息
      PaiLie3Cart: x => x.PaiLie3Cart
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
      'AddPaiLie3Cart',
      'DeletePaiLie3Cart',
      'EmptyPaiLie3Cart',
      'UpdateCart'
    ]),
    ...mapUserActions([
      'PostBetting',
      'GetStoreList',
      'GetCurrentUserInfo'
    ]),
    RandomCount () { // 机选一注
      if (this.DataLock) return
      this.DataLock = true
      let Arr = []
      for (let n = 0; n < 3; n++) {
        Arr.push(Math.floor(9 * Math.random()))
      }
      this.AddPaiLie3Cart({ List: [...Arr], Count: 1, Type: 'ZuXuan3-DanShi' })
      this.PageList = [...this.PaiLie3Cart]
      window.localStorage.PaiLie3Cart = JSON.stringify(this.PaiLie3Cart)
      this.CalcTotalCount()
      this.DataLock = false
    },
    Init () {
      if (this.PaiLie3Cart.length) {
        window.localStorage.PaiLie3Cart = JSON.stringify(this.PaiLie3Cart)
      } else if (window.localStorage.PaiLie3Cart !== undefined && window.localStorage.PaiLie3Cart !== null) {
        this.UpdateCart({ name: 'PaiLie3Cart', value: JSON.parse(window.localStorage.PaiLie3Cart) || [] })
        if (window.localStorage.niucaiselectstoreid !== 'null' && window.localStorage.niucaiselectstoreid !== undefined) {
          this.CurrentStoreId = window.localStorage.niucaiselectstoreid - 0
          this.CurrentStoreName = window.localStorage.niucaiselectstorename
        }
      }
      this.PageList = [...this.PaiLie3Cart]
      this.CalcTotalCount()
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
    },
    ToGetStoreList () {
      this.GetStoreListStatus = false
      this.GetStoreList({
        queryData: {
          location: `${this.Lng},${this.Lat}`,
          lotteryId: 'p3'
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
    ReturnType (type) { // 投注类型返回值
      switch (type) {
        case 'ZhiXuan':
          return '直选'
        case 'ZuXuan3-DanShi':
          return '组选三 单式'
        case 'ZuXuan3-FuShi':
          return '组选三 复式'
        case 'ZuXuan6':
          return '组选六'
        default:
          return '普通投注'
      }
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
      this.DeletePaiLie3Cart(index)
      this.PageList.splice(index, 1)
      window.localStorage.PaiLie3Cart = JSON.stringify(this.PaiLie3Cart)
      this.TotalCount -= item.Count
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
    ConfirmBetting () {
      if (this.DataLock || !this.PaiLie3Cart.length || this.CurrentStoreId === null) return
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
      if (this.DataLock || !this.PaiLie3Cart.length || this.CurrentStoreId === null) return
      this.DataLock = true
      let ListData = []
      this.PaiLie3Cart.map((item) => {
        ListData.push({
          amount: item.Count, // 购买注数
          charges: item.Count * 200, // 价格
          playWay: item.Type.indexOf('ZuXuan3') > -1 ? '组选3' : item.Type === 'ZhiXuan' ? '' : '组选6',
          firstDan: '', // 前区胆号, 逗号连接
          firstNums: item.Type === 'ZhiXuan' ? [item.BaiWei.join(' '), item.ShiWei.join(' '), item.GeWei.join(' ')].join(',') : item.List.join(','), // 前区其余数字, 逗号连接
          isDan: false, // 是否胆拖
          isMulti: item.Count > 1 // 是否复式
        })
      })
      let Data = {
        itemList: [...ListData], // 这个是详细购买方案的列表
        lotteryId: 'p3', // 彩种ID
        notesNum: this.TotalCount, // 总注数
        shopId: this.CurrentStoreId, // 店铺ID
        times: this.Multiple, // 倍数
        totalPrice: this.TotalCount * 200 * this.Multiple // 总金额
      }
      this.PostBetting({
        urlData: { id: 'p3' },
        data: { ...Data }
      }).then((res) => {
        done()
        this.Toast('投注成功！')
        this.EmptyPaiLie3Cart()
        this.PageList = []
        this.TotalCount = 0
        this.Multiple = 1
        this.DataLock = false
        this.GetCurrentUserInfo().then(() => {
          this.$router.push({ name: 'DingDanZhiFuZhuangTai', query: { orderId: res.data.data.orderId, bettingId: res.data.data.bettingId, routerName: 'PaiLie3' } })
        })
      }).catch((res) => {
        done()
        this.Toast(res.data.message || `未知错误，错误代码：${res.data.code}`)
        this.DataLock = false
        if (res.data.code - 0 === 1003) {
          this.$router.push({ name: 'ChongZhi', query: { from: 'PaiLie3DingDan' } })
        }
      })
    },
    EmptyCart () { // 清空购物车
      this.Dialog.confirm({
        message: '确认清空购物车？'
      }).then(() => {
        this.EmptyPaiLie3Cart()
        this.PageList = []
        this.TotalCount = 0
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
