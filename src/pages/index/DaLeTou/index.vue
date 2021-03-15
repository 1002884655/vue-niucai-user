<template>
  <div class="Page">
    <MainPageContainer :GoBack="() => { $router.replace({ name: 'index' }) }" :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="大乐透">
      <div class="PageContainer flex-v">
        <div class="Top" v-if="NewstRes !== null">
          <div class="PrevRes flex-h">
            <span>{{NewstRes.issueNo}}期</span>
            <div class="flex-item">
              <div>
                <span v-for="(item, index) in NewstRes.firstResult.split(',')" :key="`First-${index}`">{{item}}</span>
                <span class="active" v-for="(item, index) in NewstRes.secondResult.split(',')" :key="`Sec-${index}`">{{item}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 选区 -->
        <div class="flex-item">
          <div>
            <div>
              <div class="SelectArea">

                <!-- 号码池 -->
                <div class="NumberList">
                  <div class="Title flex-h">
                    <span class="flex-item">选中号码两次设胆</span>
                    <!-- <a @click="ShowMiss = !ShowMiss">{{ShowMiss ? '隐藏' : '显示'}}遗漏</a> -->
                  </div>
                  <ul>
                    <li v-for="(item, index) in FirstList" :key="index">
                      <a :class="{'active': item.Active - 0 !== 0}" @click="SelectFirstItem(item, index)">
                        <div class="centerLabel">
                          <span>{{item.Num}}</span>
                          <span v-if="item.Active - 0 === 2">胆</span>
                        </div>
                      </a>
                      <span v-if="ShowMiss">{{item.MissNum}}</span>
                    </li>
                  </ul>
                  <ul>
                    <li v-for="(item, index) in LastList" :key="index">
                      <a :class="{'active': item.Active - 0 !== 0}" @click="SelectLastItem(item, index)">
                        <div class="centerLabel">
                          <span>{{item.Num}}</span>
                          <span v-if="item.Active - 0 === 2">胆</span>
                        </div>
                      </a>
                      <span v-if="ShowMiss">{{item.MissNum}}</span>
                    </li>
                  </ul>
                </div>

                <!-- 快速选区 -->
                <div class="FastSelect">
                  <span>快速选区</span>
                  <div>
                    <a @click="RandomOne" :class="{'active': FastSelectIndex === 0}">+机选1注</a>
                    <a :class="{'active': FastSelectIndex === 1}" @click="RandomFive">+机选5注</a>
                    <a @click="SelectAllLastArr" :class="{'active': FastSelectIndex === 2}">后区全包 <span>必中</span></a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- 投注栏 -->
        <div class="Bottom flex-h">
          <a class="iconfont iconjian Delete"></a>
          <div class="flex-item">
            <div>
              <div v-if="TotalResNum">
                <span>{{TotalResNum * 200}}牛币</span>
                <span>{{TotalResNum}}注</span>
              </div>
              <span v-else>至少选5橙球2蓝球</span>
            </div>
          </div>
          <a class="Btn" :class="{'active': CanCreateRes}" @click="AddToCart">加入选号</a>
          <a class="Btn" :class="{'active': CanCreateRes}" @click="CreateOrder">投注</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapUserMutations } = createNamespacedHelpers('user')
const { mapState: mapIndexState, mapActions: mapIndexActions } = createNamespacedHelpers('index')
export default {
  name: '',
  data () {
    return {
      NewstRes: null, // 最新开奖结果
      TotalResNum: 0, // 总注数
      FastSelectIndex: null, // 快速选取索引值
      CanCreateRes: false, // 选取结果是否合法
      DataLock: false, // 数据锁
      ShowMiss: false, // 显隐遗漏
      ResObj: { FirstRes: null, LastRes: null }, // 结果数据
      FirstList: [], // 前区号码池
      LastList: [] // 后区号码池
    }
  },
  computed: {
    ...mapIndexState({
      NewstLotteryRes: x => x.NewstLotteryRes // 最新数字彩开奖结果列表
    })
  },
  components: {
    MainPageContainer
  },
  created () {
    this.Init()
    this.CreatNumList() // 创建号码池数据
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      'AddDaLeTouCart' // 新增大乐透购物车
    ]),
    ...mapIndexActions([
      'GetNewstLotteryRes'
    ]),
    Init () {
      if (!this.NewstLotteryRes.length) { // 最新数字彩开奖数据为空时，请求开奖结果
        this.GetNewstLotteryRes().then(() => {
          this.NewstLotteryRes.map((item) => {
            if (item.lotteryId === 'lottery') {
              this.NewstRes = { ...item }
            }
          })
        })
      } else {
        this.NewstLotteryRes.map((item) => {
          if (item.lotteryId === 'lottery') {
            this.NewstRes = { ...item }
          }
        })
      }
    },
    AddToCart () { // 加入选号
      if (this.DataLock || !this.CanCreateRes) return
      this.DataLock = true
      let FirstSortArr = []
      this.ResObj.FirstRes.Dan.map((item) => {
        FirstSortArr.push({ Num: item, IsDan: true, IsFirst: true })
      })
      this.ResObj.FirstRes.Tuo.map((item) => {
        FirstSortArr.push({ Num: item, IsDan: false, IsFirst: true })
      })
      FirstSortArr.sort((a, b) => { return a.Num - b.Num })
      let LastSortArr = []
      this.ResObj.LastRes.Dan.map((item) => {
        LastSortArr.push({ Num: item, IsDan: true, IsFirst: false })
      })
      this.ResObj.LastRes.Tuo.map((item) => {
        LastSortArr.push({ Num: item, IsDan: false, IsFirst: false })
      })
      LastSortArr.sort((a, b) => { return a.Num - b.Num })
      this.AddDaLeTouCart({ ...this.ResObj, SortArr: FirstSortArr.concat(LastSortArr), Count: this.TotalResNum, Multiple: 1 })
      this.FirstList.map((item) => {
        item.Active = 0
      })
      this.LastList.map((item) => {
        item.Active = 0
      })
      this.TotalResNum = 0
      this.FastSelectIndex = null
      this.DataLock = false
    },
    CreateOrder () { // 去投注
      if (this.DataLock || !this.CanCreateRes) return
      this.DataLock = true
      let FirstSortArr = []
      this.ResObj.FirstRes.Dan.map((item) => {
        FirstSortArr.push({ Num: item, IsDan: true, IsFirst: true })
      })
      this.ResObj.FirstRes.Tuo.map((item) => {
        FirstSortArr.push({ Num: item, IsDan: false, IsFirst: true })
      })
      FirstSortArr.sort((a, b) => { return a.Num - b.Num })
      let LastSortArr = []
      this.ResObj.LastRes.Dan.map((item) => {
        LastSortArr.push({ Num: item, IsDan: true, IsFirst: false })
      })
      this.ResObj.LastRes.Tuo.map((item) => {
        LastSortArr.push({ Num: item, IsDan: false, IsFirst: false })
      })
      LastSortArr.sort((a, b) => { return a.Num - b.Num })
      this.AddDaLeTouCart({ ...this.ResObj, SortArr: FirstSortArr.concat(LastSortArr), Count: this.TotalResNum, Multiple: 1 })
      this.DataLock = false
      this.$router.push({ name: 'DaLeTouDingDan' })
    },
    CreatNumList () { // 创建号码池数据
      for (let n = 0; n < 35; n++) {
        this.FirstList.push({ Num: n + 1 > 9 ? n + 1 : `0${n + 1}`, Active: 0, MissNum: 5 })
      }
      for (let n = 0; n < 12; n++) {
        this.LastList.push({ Num: n + 1 > 9 ? n + 1 : `0${n + 1}`, Active: 0, MissNum: 5 })
      }
    },
    SelectRandomIndexFromArr (max, num, arr = []) { // 数字区间中选取随机n个数值
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
        this.SelectRandomIndexFromArr(max, num, arr)
        return arr
      } else {
        return arr
      }
    },
    RandomFive () { // 机选5注
      if (this.DataLock) return false
      this.DataLock = true
      this.FastSelectIndex = 1
      this.FirstList.map((item) => { // 前区清空
        item.Active = 0
      })
      this.LastList.map((item) => { // 后区清空
        item.Active = 0
      })
      for (let n = 0; n < 5; n++) {
        let FirstArr = this.SelectRandomIndexFromArr(35, 5)
        let Res = { FirstArr: [], LastArr: [] }
        FirstArr.map((item) => {
          Res.FirstArr.push(this.FirstList[item].Num - 0)
        })
        let LastArr = this.SelectRandomIndexFromArr(12, 2)
        LastArr.map((item) => {
          Res.LastArr.push(this.LastList[item].Num - 0)
        })
        let FirstSortArr = []
        Res.FirstArr.map((item) => {
          FirstSortArr.push({ Num: item, IsDan: false, IsFirst: true })
        })
        FirstSortArr.sort((a, b) => { return a.Num - b.Num })
        let LastSortArr = []
        Res.LastArr.map((item) => {
          LastSortArr.push({ Num: item, IsDan: false, IsFirst: false })
        })
        LastSortArr.sort((a, b) => { return a.Num - b.Num })
        this.AddDaLeTouCart({ FirstRes: { Dan: [], Tuo: Res.FirstArr }, LastRes: { Dan: [], Tuo: Res.LastArr }, SortArr: FirstSortArr.concat(LastSortArr), Count: 1, Multiple: 1 })
      }
      this.DataLock = false
      this.$router.push({ name: 'DaLeTouDingDan' })
    },
    RandomOne () { // 机选1注
      if (this.DataLock) return false
      this.DataLock = true
      this.FastSelectIndex = 0
      this.FirstList.map((item) => { // 前区清空
        item.Active = 0
      })
      this.LastList.map((item) => { // 后区清空
        item.Active = 0
      })
      let FirstArr = this.SelectRandomIndexFromArr(35, 5)
      let Res = { FirstArr: [], LastArr: [] }
      FirstArr.map((item) => {
        this.FirstList[item].Active = 1
        Res.FirstArr.push(this.FirstList[item].Num - 0)
      })
      let LastArr = this.SelectRandomIndexFromArr(12, 2)
      LastArr.map((item) => {
        this.LastList[item].Active = 1
        Res.LastArr.push(this.LastList[item].Num - 0)
      })
      this.CreateTotalRes({ Dan: [], Tuo: Res.FirstArr }, { Dan: [], Tuo: Res.LastArr }) // 计算总注数
      this.ResObj.FirstRes = { Dan: [], Tuo: Res.FirstArr }
      this.ResObj.LastRes = { Dan: [], Tuo: Res.LastArr }
      this.CanCreateRes = true
      this.DataLock = false
    },
    SelectAllLastArr () { // 后区全包
      if (this.DataLock) return false
      this.DataLock = true
      this.FastSelectIndex = 2
      let Res = { FirstArr: [], LastArr: [] }
      this.FirstList.map((item) => { // 前区清空
        item.Active = 0
      })
      this.LastList.map((item) => { // 后区全选
        item.Active = 1
        Res.LastArr.push(item.Num - 0)
      })
      let FirstArr = this.SelectRandomIndexFromArr(35, 5)
      FirstArr.map((item) => {
        this.FirstList[item].Active = 1
        Res.FirstArr.push(this.FirstList[item].Num - 0)
      })
      this.CreateTotalRes({ Dan: [], Tuo: Res.FirstArr }, { Dan: [], Tuo: Res.LastArr }) // 计算总注数
      this.ResObj.FirstRes = { Dan: [], Tuo: Res.FirstArr }
      this.ResObj.LastRes = { Dan: [], Tuo: Res.LastArr }
      this.CanCreateRes = true
      this.DataLock = false
    },
    CalcRes () { // 计算结果
      let CurrentFirstList = []
      let CurrentLastList = []
      this.FirstList.map((item) => { // 前区
        if (item.Active !== 0) {
          CurrentFirstList.push({ ...item })
        }
      })
      this.LastList.map((item) => { // 后区
        if (item.Active !== 0) {
          CurrentLastList.push({ ...item })
        }
      })
      this.CanCreateRes = CurrentFirstList.length >= 5 && CurrentLastList.length >= 2 // 前区选号个数必须大于等于5 && 后区选号个数必须大于等于2
      if (this.CanCreateRes) { // 选取结果合法时，计算选取结果
        this.CreateTotalRes(this.CreateTuoDanRes(CurrentFirstList), this.CreateTuoDanRes(CurrentLastList))
        this.ResObj.FirstRes = this.CreateTuoDanRes(CurrentFirstList)
        this.ResObj.LastRes = this.CreateTuoDanRes(CurrentLastList)
      }
      this.DataLock = false
    },
    CreateTuoDanRes (arr) { // 生成拖胆结果
      let DanArr = []
      let TuoArr = []
      arr.map((item) => {
        if (item.Active === 2) { // 选出胆号
          DanArr.push(item.Num - 0)
        } else { // 选出拖号
          TuoArr.push(item.Num - 0)
        }
      })
      return { Dan: DanArr.sort((a, b) => { return a - b }), Tuo: TuoArr.sort((a, b) => { return a - b }) }
    },
    CreateTotalRes (FirstRes, LastRes) { // 生成所有注数
      let FirstResNum = 0
      let LastResNum = 0
      let m = 0
      let n = 0
      if (FirstRes.Dan.length) {
        m = FirstRes.Tuo.length
        n = 5 - FirstRes.Dan.length
      } else {
        m = FirstRes.Tuo.length
        n = 5
      }
      FirstResNum = this.JieCheng(m) / (this.JieCheng(n) * this.JieCheng(m - n))

      if (LastRes.Dan.length) {
        m = LastRes.Tuo.length
        n = 2 - LastRes.Dan.length
      } else {
        m = LastRes.Tuo.length
        n = 2
      }
      LastResNum = this.JieCheng(m) / (this.JieCheng(n) * this.JieCheng(m - n))
      this.TotalResNum = FirstResNum * LastResNum
    },
    JieCheng (num) {
      return num > 0 ? num * this.JieCheng(num - 1) : 1
    },
    SelectFirstItem (item, index) { // 前区选号
      if (this.DataLock) return
      this.DataLock = true
      this.FastSelectIndex = null
      let DanCount = 0
      this.FirstList.map((item) => {
        if (item.Active === 2) {
          DanCount += 1
        }
      })
      if (DanCount < 4) { // 胆号个数不能超过4个
        item.Active = item.Active === 0 ? 1 : item.Active === 1 ? 2 : 0
      } else {
        item.Active = item.Active === 0 ? 1 : 0
      }
      this.CalcRes() // 计算结果
    },
    SelectLastItem (item, index) { // 后区选号
      if (this.DataLock) return
      this.DataLock = true
      this.FastSelectIndex = null
      let DanCount = 0
      this.LastList.map((item) => {
        if (item.Active === 2) {
          DanCount += 1
        }
      })
      if (DanCount < 1) { // 胆号个数不能超过1个
        item.Active = item.Active === 0 ? 1 : item.Active === 1 ? 2 : 0
      } else {
        item.Active = item.Active === 0 ? 1 : 0
      }
      this.CalcRes() // 计算结果
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
