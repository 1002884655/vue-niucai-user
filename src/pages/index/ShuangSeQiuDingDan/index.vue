<template>
  <div class="Page">
    <MainPageContainer :GoBack="() => { $router.replace({ name: 'ShuangSeQiu' }) }" :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="双色球">
      <div class="PageContainer flex-v">
        <div class="flex-item">
          <div>

            <ul>
              <li v-for="(item, index) in PageList" :key="index">
                <a class="iconfont iconguanbi Close" @click="DeleteItem(index)"></a>
                <div class="flex-h">
                  <span class="flex-item">{{ReturnType(item)}}<em>{{item.Count}}</em>注<em>{{item.Count * 200}}</em>牛币</span>
                </div>
                <ul>
                  <li v-for="(subItem, subIndex) in item.SortArr" :key="subIndex" :class="{'active': !subItem.IsFirst}">
                    <div class="centerLabel">
                      <span>{{subItem.Num - 0 > 9 ? subItem.Num : `0${subItem.Num}`}}</span>
                      <span v-if="subItem.IsDan">胆</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>

            <div class="OtherTab">
              <div>
                <div class="flex-h">
                  <span class="flex-item">加倍</span>
                  <span>
                    <a class="iconfont iconjianhao" @click="Multiple = Multiple > 1 ? Multiple - 1 : 1"></a>
                    <input type="number" disabled="disabled" v-model="Multiple">
                    <span>倍</span>
                    <a class="iconfont iconjiahao" @click="Multiple += 1"></a>
                  </span>
                </div>
                <!-- <div class="flex-h">
                  <span class="flex-item">是否追期？</span>
                  <span>追号喜中二等奖</span>
                  <van-switch v-model="IsAdd" active-color="#07c160" inactive-color="#ccc" size="0.13rem" @change="SwitchChange" />
                </div> -->
              </div>
            </div>

          </div>
        </div>
        <div class="Bottom">
          <div class="Store">
            <a @click="() => { if (GetStoreListStatus) { ShowStore = true } }">店铺：{{GetStoreListStatus ? CurrentStoreName === null ? '请选择' : CurrentStoreName : '正在请求店铺数据...'}} <i class="iconfont iconjiantoudown"></i></a>
          </div>
          <div class="Count">
            <span><em>{{TotalCount}}</em>注</span>
            <span>金额：<em>{{TotalPrize * Multiple}}</em>牛币</span>
          </div>
          <a @click="ConfirmBetting" :class="{'active': CurrentStoreId !== null && ShuangSeQiuCart.length}">立即购买</a>
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
import { Switch } from 'vant'
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
      Multiple: 1, // 倍数
      ShowStore: false, // 是否显示店铺选择弹窗
      TotalCount: 0, // 总注数
      TotalPrize: 0, // 总金额
      IsAdd: false, // 是否追加
      PageList: [],
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo, // 用户信息
      ShuangSeQiuCart: x => x.ShuangSeQiuCart // 双色球购物车
    })
  },
  components: {
    MainPageContainer,
    'van-switch': Switch
  },
  created () {
    if (this.ShuangSeQiuCart.length) {
      window.localStorage.ShuangSeQiuCart = JSON.stringify(this.ShuangSeQiuCart)
    } else if (window.localStorage.ShuangSeQiuCart !== undefined && window.localStorage.ShuangSeQiuCart !== null) {
      this.UpdateCart({ name: 'ShuangSeQiuCart', value: JSON.parse(window.localStorage.ShuangSeQiuCart) || [] })
      if (window.localStorage.niucaiselectstoreid !== 'null' && window.localStorage.niucaiselectstoreid !== undefined) {
        this.CurrentStoreId = window.localStorage.niucaiselectstoreid - 0
        this.CurrentStoreName = window.localStorage.niucaiselectstorename
      }
    }
    this.PageList = [...this.ShuangSeQiuCart]
    this.CheckOrderCount() // 计算订单倍数、金额
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
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      'DeleteShuangSeQiuCart',
      'EmptyShuangSeQiuCart',
      'UpdateCart'
    ]),
    ...mapUserActions([
      'PostBetting',
      'GetStoreList',
      'GetCurrentUserInfo'
    ]),
    ToGetStoreList () {
      this.GetStoreListStatus = false
      this.GetStoreList({
        queryData: {
          location: `${this.Lng},${this.Lat}`,
          lotteryId: 'double-color'
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
    ResToString (target) {
      let arr = []
      target.map((item) => {
        arr.push(item - 0 > 9 ? `${item}` : `0${item}`)
      })
      return arr
    },
    ConfirmBetting () {
      if (this.DataLock || !this.ShuangSeQiuCart.length || this.CurrentStoreId === null) return
      this.Dialog.confirm({
        title: '确认投注',
        message: `您将花费${this.TotalPrize * this.Multiple}牛币进行投注，目前账户余额${this.UserInfo.account.amount}牛币`,
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
      if (this.DataLock || !this.ShuangSeQiuCart.length || this.CurrentStoreId === null) return
      this.DataLock = true
      let ListData = []
      this.ShuangSeQiuCart.map((item) => {
        item.FirstRes.Dan.sort((a, b) => { return a - b })
        item.FirstRes.Dan = this.ResToString(item.FirstRes.Dan)
        item.FirstRes.Tuo.sort((a, b) => { return a - b })
        item.FirstRes.Tuo = this.ResToString(item.FirstRes.Tuo)
        item.LastRes.Dan.sort((a, b) => { return a - b })
        item.LastRes.Dan = this.ResToString(item.LastRes.Dan)
        item.LastRes.Tuo.sort((a, b) => { return a - b })
        item.LastRes.Tuo = this.ResToString(item.LastRes.Tuo)
        ListData.push({
          amount: item.Count, // 购买注数
          charges: item.Count * 200, // 价格
          firstDan: item.FirstRes.Dan.join(','), // 前区胆号, 逗号连接
          firstNums: item.FirstRes.Tuo.join(','), // 前区其余数字, 逗号连接
          isDan: !!item.FirstRes.Dan.length, // 是否胆拖
          isMulti: item.Count > 1, // 是否复式
          secondDan: item.LastRes.Dan.join(','), // 后区胆号, 逗号连接
          secondNums: item.LastRes.Tuo.join(',') // 后区其余数字, 逗号连接
        })
      })
      let Data = {
        itemList: [...ListData], // 这个是详细购买方案的列表
        lotteryId: 'double-color', // 彩种ID
        notesNum: this.TotalCount, // 总注数
        shopId: this.CurrentStoreId, // 店铺ID
        times: this.Multiple, // 倍数
        totalPrice: this.TotalPrize * this.Multiple // 总金额
      }
      this.PostBetting({
        urlData: { id: 'double-color' },
        data: { ...Data }
      }).then((res) => {
        done()
        this.Toast('投注成功！')
        this.EmptyShuangSeQiuCart()
        this.PageList = []
        this.TotalCount = 0
        this.TotalPrize = 0
        this.Multiple = 1
        this.DataLock = false
        this.GetCurrentUserInfo().then(() => {
          this.$router.push({ name: 'DingDanZhiFuZhuangTai', query: { orderId: res.data.data.orderId, bettingId: res.data.data.bettingId, routerName: 'ShuangSeQiu' } })
        })
      }).catch((res) => {
        done()
        this.Toast(res.data.message || `未知错误，错误代码：${res.data.code}`)
        this.DataLock = false
        if (res.data.code - 0 === 1003) {
          this.$router.push({ name: 'ChongZhi', query: { from: 'ShuangSeQiuDingDan' } })
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
    SwitchChange () { // 追加状态改变
      this.CheckOrderCount()
    },
    DeleteItem (index) { // 删除投注
      this.DeleteShuangSeQiuCart(index)
      this.PageList = [...this.ShuangSeQiuCart]
      window.localStorage.ShuangSeQiuCart = JSON.stringify(this.ShuangSeQiuCart)
      this.CheckOrderCount()
    },
    ReturnType (item) {
      if (item.FirstRes.Dan.length || item.LastRes.Dan.length) {
        return '拖胆'
      } else if (item.Count > 1) {
        return '复式'
      } else {
        return '单式'
      }
    },
    MultipleLess (item) { // 减少倍数
      if (item.Multiple > 1 && !this.DataLock) {
        this.DataLock = true
        item.Multiple -= 1
        this.CheckOrderCount() // 计算订单倍数、金额
        this.DataLock = false
      }
    },
    MultipleMore (item) { // 增加倍数
      if (!this.DataLock) {
        this.DataLock = true
        item.Multiple += 1
        this.CheckOrderCount() // 计算订单倍数、金额
        this.DataLock = false
      }
    },
    CheckOrderCount () { // 计算订单倍数、金额
      let Count = 0 // 注数
      let Money = 0 // 金额
      this.PageList.map((item) => {
        Count += item.Count
        Money += item.Count * item.Multiple * 2
      })
      this.TotalCount = Count
      this.TotalPrize = Money * 100
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
