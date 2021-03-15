<template>
  <div class="Page">
    <MainPageContainer :GoBack="() => { $router.replace({ name: 'index' }) }" :ShowMainHeader="true" :ShowMainTitleIcon="true" :ShowMainHeaderBack="true" :MainHeaderTitle="MainTitle" :MainTitleClick="MainTitleClick">
      <div class="PageContainer flex-v">
        <div class="HideNav" :class="{'active': ShowSelectTypeNav}">
          <div class="flex-h">
            <a class="flex-item" @click="CutSelectType(1)">直选</a>
            <a class="flex-item" @click="CutSelectType(2)">组选3</a>
            <a class="flex-item" @click="CutSelectType(3)">组选6</a>
          </div>
        </div>

        <!-- 选区 -->
        <div class="flex-item">
          <div>
            <div>
              <div class="SelectArea" :class="{'active': SelectType === 2}">

                <!-- 直选 -->
                <div class="ZhiXuanArea" v-if="SelectType === 1">
                  <div>
                    <span>百位区（至少选择一个）</span>
                    <ul>
                      <li v-for="(item, index) in ZhiXuanData.BaiWei" :key="index">
                        <a :class="{'active': item.Active}" @click="ZhiXuanSelectItem(item)">{{item.Num}}</a>
                        <!-- <span>{{item.MissNum}}</span> -->
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>十位区（至少选择一个）</span>
                    <ul>
                      <li v-for="(item, index) in ZhiXuanData.ShiWei" :key="index">
                        <a :class="{'active': item.Active}" @click="ZhiXuanSelectItem(item)">{{item.Num}}</a>
                        <!-- <span>{{item.MissNum}}</span> -->
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>个位区（至少选择一个）</span>
                    <ul>
                      <li v-for="(item, index) in ZhiXuanData.GeWei" :key="index">
                        <a :class="{'active': item.Active}" @click="ZhiXuanSelectItem(item)">{{item.Num}}</a>
                        <!-- <span>{{item.MissNum}}</span> -->
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- 组选3 -->
                <div class="ZuXuan3Area" v-if="SelectType === 2">
                  <div class="flex-v">
                    <nav class="flex-h">
                      <a class="flex-item" :class="{'active': ZuXuan3Type === 1}" @click="CutZuXuan3(1)">单式</a>
                      <a class="flex-item" :class="{'active': ZuXuan3Type === 2}" @click="CutZuXuan3(2)">复式</a>
                    </nav>
                    <div class="flex-item">
                      <div>

                        <!-- 单式 -->
                        <div v-if="ZuXuan3Type === 1">
                          <div>
                            <span>出现两次的号码</span>
                            <ul>
                              <li v-for="(item, index) in ZuXuan3Data.DanShiTwice" :key="index">
                                <a :class="{'active': item.Active}" @click="SelectZuXuan3DanShi(item, 2)">{{item.Num}}</a>
                                <!-- <span>{{item.MissNum}}</span> -->
                              </li>
                            </ul>
                          </div>
                          <div>
                            <span>出现一次的号码</span>
                            <ul>
                              <li v-for="(item, index) in ZuXuan3Data.DanShiOnce" :key="index">
                                <a :class="{'active': item.Active}" @click="SelectZuXuan3DanShi(item, 1)">{{item.Num}}</a>
                                <!-- <span>{{item.MissNum}}</span> -->
                              </li>
                            </ul>
                          </div>
                        </div>

                        <!-- 复式 -->
                        <div v-if="ZuXuan3Type === 2">
                          <div>
                            <span>选择号码（至少选择2个）</span>
                            <ul>
                              <li v-for="(item, index) in ZuXuan3Data.FuShi" :key="index">
                                <a :class="{'active': item.Active}" @click="SelectZuXuan3FuShi(item)">{{item.Num}}</a>
                                <!-- <span>{{item.MissNum}}</span> -->
                              </li>
                            </ul>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <!-- 组选6 -->
                <div class="ZuXuan6Area" v-if="SelectType === 3">
                  <div class="Num">
                    <span>选择号码（至少选择3个）</span>
                    <ul>
                      <li v-for="(item, index) in ZuXuan6Data" :key="index">
                        <a :class="{'active': item.Active}" @click="ZuXuan6SelectItem(item)">{{item.Num}}</a>
                        <!-- <span>{{item.MissNum}}</span> -->
                      </li>
                    </ul>
                  </div>
                  <div class="FastSelect">
                    <span>快速选号</span>
                    <ul>
                      <li><a @click="ZuXuan6RandomSelect(8, 0)" :class="{'active': ZuXuan6RandomActiveIndex === 0}">10选8 赔率1.54</a></li>
                      <li><a @click="ZuXuan6RandomSelect(7, 1)" :class="{'active': ZuXuan6RandomActiveIndex === 1}">10选7 赔率2.47</a></li>
                      <li><a @click="ZuXuan6RandomSelect(6, 2)" :class="{'active': ZuXuan6RandomActiveIndex === 2}">10选6 赔率4.32</a></li>
                      <li><a @click="ZuXuan6RandomSelect(5, 3)" :class="{'active': ZuXuan6RandomActiveIndex === 3}">10选5 赔率8.65</a></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- 投注栏 -->
        <div class="Bottom flex-h">
          <span class="SelectRes">共<em>{{TotalResNum}}</em>注<em>{{TotalResNum * 200}}</em>牛币</span>
          <a class="iconfont iconjian" @click="EmptyData"></a>
          <router-link :to="{ name: 'PaiLie3DingDan' }" class="iconfont icongouwuche"><span>{{PaiLie3Cart.length > 99 ? '99+' : PaiLie3Cart.length}}</span></router-link>
          <!-- <a class="iconfont iconqushi"></a> -->
          <div class="flex-item"></div>
          <a class="Btn" :class="{'active': CanCreateRes}" @click="AddCart">添加号码</a>
          <a class="Btn" :class="{'active': CanCreateRes}" @click="CreateOrder">投注</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      MainTitle: '',
      ZuXuan6RandomActiveIndex: null,
      DataLock: false, // 数据锁
      ResList: [],
      TotalResNum: 0, // 总注数
      CanCreateRes: false, // 能否生成选注结果
      ZhiXuanData: {
        BaiWei: [],
        ShiWei: [],
        GeWei: []
      },
      ZuXuan3Data: {
        DanShiOnce: [],
        DanShiTwice: [],
        FuShi: []
      },
      ZuXuan6Data: [],
      ZuXuan3Type: 1,
      SelectType: 1, // 选法：1-直选 2-组选3 3-组选6
      ShowSelectTypeNav: false // 显隐选法列表
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
    this.MainTitle = `排列3-${this.SelectType === 1 ? '直选' : this.SelectType === 2 ? '组选3' : '组选6'}`
    this.CreateData()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      'AddPaiLie3Cart'
    ]),
    Init () { // 初始化

    },
    CreateOrder () { // 去投注
      this.CreateRes()
      this.$router.push({ name: 'PaiLie3DingDan' })
    },
    AddCart () { // 添加购物车
      this.CreateRes()
      this.EmptyData()
    },
    SelectZuXuan3FuShi (item) { // 组选三-复式
      if (this.DataLock) return
      this.DataLock = true
      item.Active = !item.Active
      this.DataLock = false
      this.CalcZuXuan3Res() // 计算组选3结果
    },
    SelectZuXuan3DanShi (item, type) { // 组选三-单式
      if (this.DataLock) return
      this.DataLock = true
      if (item.Active) {
        item.Active = false
      } else {
        let Bool = true
        if (type - 0 === 2) { // 2次出现号码选择
          this.ZuXuan3Data.DanShiOnce.map((thisItem) => { // 判别与出现一次号码是否重复
            if (thisItem.Num === item.Num && thisItem.Active) {
              Bool = false
            }
          })
          if (Bool) {
            this.ZuXuan3Data.DanShiTwice.map((thisItem) => {
              thisItem.Active = false
            })
          }
        } else { // 1次出现号码选择
          this.ZuXuan3Data.DanShiTwice.map((thisItem) => { // 判别与出现两次号码是否重复
            if (thisItem.Num === item.Num && thisItem.Active) {
              Bool = false
            }
          })
          if (Bool) {
            this.ZuXuan3Data.DanShiOnce.map((thisItem) => {
              thisItem.Active = false
            })
          }
        }
        if (Bool) {
          item.Active = true
        }
      }
      this.DataLock = false
      this.CalcZuXuan3Res() // 计算组选3结果
    },
    CalcZuXuan3Res () { // 计算组选3结果
      if (this.DataLock) return
      this.DataLock = true
      if (this.ZuXuan3Type === 1) { // 单式
        let Num = 0
        this.ZuXuan3Data.DanShiOnce.map((item) => {
          if (item.Active) {
            Num += 1
          }
        })
        this.ZuXuan3Data.DanShiTwice.map((item) => {
          if (item.Active) {
            Num += 1
          }
        })
        this.CanCreateRes = Num >= 2
        this.TotalResNum = this.CanCreateRes ? 1 : 0
      } else { // 复式
        let Num = 0
        this.ZuXuan3Data.FuShi.map((item) => {
          if (item.Active) {
            Num += 1
          }
        })
        this.CanCreateRes = Num >= 2
        this.TotalResNum = this.CanCreateRes ? Num * (Num - 1) : 0
      }
      this.DataLock = false
    },
    CreateRes () { // 创建投注结果
      if (this.DataLock || !this.CanCreateRes) return
      this.DataLock = true
      if (this.SelectType === 1) { // 直选
        let Res = {}
        for (let key in this.ZhiXuanData) {
          Res[key] = []
          for (let n = 0; n < this.ZhiXuanData[key].length; n++) {
            if (this.ZhiXuanData[key][n].Active) {
              Res[key].push(this.ZhiXuanData[key][n].Num)
            }
          }
        }
        this.AddPaiLie3Cart({ ...Res, Count: this.TotalResNum, Type: 'ZhiXuan' })
      } else if (this.SelectType === 2) { // 组选3
        if (this.ZuXuan3Type === 1) { // 单式
          let Once = null
          let Twice = null
          this.ZuXuan3Data.DanShiOnce.map((item) => {
            if (item.Active) {
              Once = item.Num
            }
          })
          this.ZuXuan3Data.DanShiTwice.map((item) => {
            if (item.Active) {
              Twice = item.Num
            }
          })
          this.AddPaiLie3Cart({ List: [Once, Twice, Twice].sort((a, b) => { return a - b }), Count: this.TotalResNum, Type: 'ZuXuan3-DanShi' })
        } else if (this.ZuXuan3Type === 2) { // 复式
          let Arr = []
          this.ZuXuan3Data.FuShi.map((item) => {
            if (item.Active) {
              Arr.push(item.Num)
            }
          })
          this.AddPaiLie3Cart({ List: [...Arr], Count: this.TotalResNum, Type: 'ZuXuan3-FuShi' })
        }
      } else if (this.SelectType === 3) { // 组选6
        let Res = []
        this.ZuXuan6Data.map((item) => {
          if (item.Active) {
            Res.push(item.Num)
          }
        })
        Res.sort((a, b) => { return a - b })
        this.AddPaiLie3Cart({ List: [...Res], Count: this.TotalResNum, Type: 'ZuXuan6' })
      }
      this.DataLock = false
    },
    EmptyData () { // 清空数据
      for (let key in this.ZhiXuanData) { this.ZhiXuanData[key].map((item) => { item.Active = false }) }
      for (let key in this.ZuXuan3Data) { this.ZuXuan3Data[key].map((item) => { item.Active = false }) }
      this.ZuXuan6Data.map((item) => { item.Active = false })
      this.CanCreateRes = false
      this.TotalResNum = 0
    },
    CalcZhiXuanRes () { // 计算直选结果
      if (this.DataLock) return
      this.DataLock = true
      let ActiveKeyNum = 0
      let TotalKeyNum = 0
      for (let key in this.ZhiXuanData) {
        TotalKeyNum += 1
        for (let n = 0; n < this.ZhiXuanData[key].length; n++) {
          if (this.ZhiXuanData[key][n].Active) {
            ActiveKeyNum += 1
            break
          }
        }
      }
      this.CanCreateRes = ActiveKeyNum >= TotalKeyNum
      if (this.CanCreateRes) {
        this.TotalResNum = 1
        for (let key in this.ZhiXuanData) {
          let Num = 0
          for (let n = 0; n < this.ZhiXuanData[key].length; n++) {
            if (this.ZhiXuanData[key][n].Active) {
              Num += 1
            }
          }
          this.TotalResNum *= Num
        }
      }
      this.DataLock = false
    },
    ZhiXuanSelectItem (item) { // 直选-选择号码
      if (this.DataLock) return
      item.Active = !item.Active
      this.CalcZhiXuanRes() // 计算直选结果
    },
    CalcZuXuan6Res () { // 计算组选6结果
      if (this.DataLock) return
      this.DataLock = true
      let Num = 0
      for (let n = 0; n < this.ZuXuan6Data.length; n++) {
        if (this.ZuXuan6Data[n].Active) {
          Num += 1
        }
      }
      this.CanCreateRes = Num >= 3
      if (this.CanCreateRes) {
        this.TotalResNum = this.JieCheng(Num) / (this.JieCheng(3) * this.JieCheng(Num - 3))
      }
      this.DataLock = false
    },
    JieCheng (num) {
      return num > 0 ? num * this.JieCheng(num - 1) : 1
    },
    ZuXuan6SelectItem (item) { // 组选6-选择号码
      if (this.DataLock) return
      item.Active = !item.Active
      this.ZuXuan6RandomActiveIndex = null
      this.CalcZuXuan6Res() // 计算组选6结果
    },
    ZuXuan6RandomSelect (num, index) { // 组选6机选
      if (this.DataLock) return
      this.DataLock = true
      this.ZuXuan6Data.map((item) => {
        item.Active = false
      })
      this.RandomSelect(9, num).map((item) => {
        this.ZuXuan6Data[item].Active = true
      })
      this.ZuXuan6RandomActiveIndex = index
      this.DataLock = false
      this.CalcZuXuan6Res() // 计算组选6结果
      this.CanCreateRes = true
    },
    RandomSelect (max, num, arr = []) { // 数字区间中选取随机n个数值
      if (arr.length < num) {
        let Random = Math.floor(max * Math.random())
        let Bool = true
        arr.map((item) => {
          if (item - 0 === Random) {
            Bool = false
          }
        })
        if (Bool) {
          arr.push(Random)
        }
        this.RandomSelect(max, num, arr)
        return arr
      } else {
        return arr
      }
    },
    CutZuXuan3 (type) { // 切换组选3类型
      this.EmptyData()
      this.ZuXuan3Type = type
    },
    CreateData () { // 创建数据
      this.ZhiXuanData.BaiWei = []
      this.ZhiXuanData.ShiWei = []
      this.ZhiXuanData.GeWei = []
      for (let n = 0; n < 10; n++) { // 创建直选数据
        this.ZhiXuanData.BaiWei.push({ Num: n, MissNum: 0, Active: false })
        this.ZhiXuanData.ShiWei.push({ Num: n, MissNum: 0, Active: false })
        this.ZhiXuanData.GeWei.push({ Num: n, MissNum: 0, Active: false })
        this.ZuXuan3Data.DanShiOnce.push({ Num: n, MissNum: 0, Active: false })
        this.ZuXuan3Data.DanShiTwice.push({ Num: n, MissNum: 0, Active: false })
        this.ZuXuan3Data.FuShi.push({ Num: n, MissNum: 0, Active: false })
        this.ZuXuan6Data.push({ Num: n, MissNum: 0, Active: false })
      }
    },
    CutSelectType (num) { // 切换选法
      this.EmptyData()
      this.SelectType = num
      this.MainTitle = `排列3-${this.SelectType === 1 ? '直选' : this.SelectType === 2 ? '组选3' : '组选6'}`
      this.ShowSelectTypeNav = false
    },
    MainTitleClick () {
      this.ShowSelectTypeNav = !this.ShowSelectTypeNav
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
