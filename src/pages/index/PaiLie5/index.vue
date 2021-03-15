<template>
  <div class="Page">
    <MainPageContainer :GoBack="() => { $router.replace({ name: 'index' }) }" :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="排列5">
      <div class="PageContainer flex-v">
        <nav class="flex-h">
          <a class="flex-item" :class="{'active': SelectType === 1}" @click="CutSelectType(1)">自选</a>
          <a class="flex-item" :class="{'active': SelectType === 2}" @click="CutSelectType(2)">机选</a>
        </nav>

        <!-- 选区 -->
        <div class="flex-item">
          <div>
            <div>
              <div class="SelectArea">

                <!-- 自选 -->
                <div class="ZiXuanArea" v-if="SelectType === 1">
                  <div>
                    <span>万位区（至少选择一个）</span>
                    <ul>
                      <li v-for="(item, index) in NumData.WanWei" :key="index">
                        <a :class="{'active': item.Active}" @click="SelectItem(item, 'WanWei')">{{item.Num}}</a>
                        <!-- <span>{{item.MissNum}}</span> -->
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>千位区（至少选择一个）</span>
                    <ul>
                      <li v-for="(item, index) in NumData.QianWei" :key="index">
                        <a :class="{'active': item.Active}" @click="SelectItem(item, 'QianWei')">{{item.Num}}</a>
                        <!-- <span>{{item.MissNum}}</span> -->
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>百位区（至少选择一个）</span>
                    <ul>
                      <li v-for="(item, index) in NumData.BaiWei" :key="index">
                        <a :class="{'active': item.Active}" @click="SelectItem(item, 'BaiWei')">{{item.Num}}</a>
                        <!-- <span>{{item.MissNum}}</span> -->
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>十位区（至少选择一个）</span>
                    <ul>
                      <li v-for="(item, index) in NumData.ShiWei" :key="index">
                        <a :class="{'active': item.Active}" @click="SelectItem(item, 'ShiWei')">{{item.Num}}</a>
                        <!-- <span>{{item.MissNum}}</span> -->
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>个位区（至少选择一个）</span>
                    <ul>
                      <li v-for="(item, index) in NumData.GeWei" :key="index">
                        <a :class="{'active': item.Active}" @click="SelectItem(item, 'GeWei')">{{item.Num}}</a>
                        <!-- <span>{{item.MissNum}}</span> -->
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- 机选 -->
                <div class="JiXuanArea" v-if="SelectType === 2">
                  <nav class="flex-h">
                    <a class="flex-item" :class="{'active': RandomCount === 1}" @click="CutRandomCount(1)">注数1</a>
                    <a class="flex-item" :class="{'active': RandomCount === 2}" @click="CutRandomCount(2)">注数2</a>
                    <a class="flex-item" :class="{'active': RandomCount === 3}" @click="CutRandomCount(3)">注数3</a>
                    <a class="flex-item" :class="{'active': RandomCount === 4}" @click="CutRandomCount(4)">注数4</a>
                    <a class="flex-item" :class="{'active': RandomCount === 5}" @click="CutRandomCount(5)">注数5</a>
                  </nav>
                  <ul>
                    <li v-for="(item, index) in RandomRes" :key="index">
                      <span>{{item.WanWei[0]}}</span>
                      <span>{{item.QianWei[0]}}</span>
                      <span>{{item.BaiWei[0]}}</span>
                      <span>{{item.ShiWei[0]}}</span>
                      <span>{{item.GeWei[0]}}</span>
                      <a class="iconfont iconjian" v-if="RandomRes.length > 1" @click="DeleteRandomResItem(index)"></a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- 投注栏 -->
        <div class="Bottom flex-h">
          <span class="SelectRes">共<em>{{TotalResNum}}</em>注<em>{{TotalResNum * 200}}</em>牛币</span>
          <a class="iconfont iconjian" v-if="SelectType === 1" @click="EmptySelectArea"></a>
          <router-link :to="{ name: 'PaiLie5DingDan' }" class="iconfont icongouwuche"><span>{{PaiLie5Cart.length > 99 ? '99+' : PaiLie5Cart.length}}</span></router-link>
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
      TotalResNum: 0, // 总注数
      CanCreateRes: false, // 能否生成选注结果
      SelectType: 1, // 选注类型：1-自选 2-机选
      RandomCount: 1, // 机选注数
      RandomRes: [], // 机选结果
      DataLock: false, // 数据锁
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
    this.CreateData()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      'AddPaiLie5Cart'
    ]),
    Init () { // 初始化

    },
    CreateOrder () { // 去投注
      if (this.DataLock || !this.CanCreateRes) return
      this.AddCart()
      this.$router.push({ name: 'PaiLie5DingDan' })
    },
    DeleteRandomResItem (index) { // 删除机选注
      this.RandomRes.splice(index, 1)
      this.TotalResNum -= 1
      this.RandomCount -= 1
    },
    CutRandomCount (num) { // 切换机选注数
      if (this.DataLock) return
      this.DataLock = true
      this.RandomRes = []
      for (let n = 0; n < num; n++) {
        let Res = {}
        for (let key in this.NumData) {
          Res[key] = [this.NumData[key][Math.floor(this.NumData[key].length * Math.random())].Num]
        }
        this.RandomRes.push({ ...Res, Count: 1, Type: 'Random' })
      }
      this.RandomCount = num
      this.TotalResNum = num
      this.CanCreateRes = true
      this.DataLock = false
    },
    AddCart () { // 添加购物车
      if (this.DataLock || !this.CanCreateRes) return
      this.DataLock = true
      if (this.SelectType === 1) { // 自选
        let Res = {}
        for (let key in this.NumData) {
          Res[key] = []
          for (let n = 0; n < this.NumData[key].length; n++) {
            if (this.NumData[key][n].Active) {
              Res[key].push(this.NumData[key][n].Num)
            }
          }
        }
        this.AddPaiLie5Cart({ ...Res, Count: this.TotalResNum, Type: 'User' })
        this.EmptySelectArea() // 清空自选选区
        this.DataLock = false
      } else { // 机选
        this.RandomRes.map((item) => {
          this.AddPaiLie5Cart({ ...item })
        })
        this.DataLock = false
        this.CutRandomCount(this.RandomCount)
      }
    },
    EmptySelectArea () { // 清空自选选区
      this.CanCreateRes = false
      this.TotalResNum = 0
      for (let key in this.NumData) {
        for (let n = 0; n < this.NumData[key].length; n++) {
          this.NumData[key][n].Active = false
        }
      }
    },
    SelectItem (item, type) { // 选择号码
      if (this.DataLock) return
      this.DataLock = true
      item.Active = !item.Active
      this.CalcTotalRes()
      this.DataLock = false
    },
    CalcTotalRes () { // 计算投注结果
      let Num = 0
      let KeyNum = 0
      for (let key in this.NumData) {
        KeyNum += 1
        for (let n = 0; n < this.NumData[key].length; n++) {
          if (this.NumData[key][n].Active) {
            Num += 1
            break
          }
        }
      }
      this.CanCreateRes = Num >= KeyNum
      if (this.CanCreateRes) {
        let Total = 1
        for (let key in this.NumData) {
          let Count = 0
          for (let n = 0; n < this.NumData[key].length; n++) {
            if (this.NumData[key][n].Active) {
              Count += 1
            }
          }
          Total *= Count
        }
        this.TotalResNum = Total
      }
    },
    CutSelectType (type) { // 切换选取类型
      if (type !== this.SelectType) {
        if (type === 1) {
          this.EmptySelectArea() // 清空自选选区
        } else {
          this.RandomRes = []
          this.RandomCount = 1
          this.CutRandomCount(this.RandomCount)
        }
        this.SelectType = type
      }
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
