/* eslint-disable */
import Axios from 'axios'
import qs from 'qs'
import { APIBase } from './constant'

const ToolClass = {
  Distance (la1, lo1, la2, lo2) {
    let La1 = la1 * Math.PI / 180.0
    let La2 = la2 * Math.PI / 180.0
    let La3 = La1 - La2
    let Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)))
    s = s * 6378.137
    s = Math.round(s * 10000) / 10000
    return s.toFixed(1)
  },
  FormatDate (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    var o = {
      'M+': new Date(date).getMonth() + 1,                 //月份   
      'd+': new Date(date).getDate(),                    //日   
      'h+': new Date(date).getHours(),                   //小时   
      'm+': new Date(date).getMinutes(),                 //分   
      's+': new Date(date).getSeconds(),                 //秒   
      'q+': Math.floor((new Date(date).getMonth() + 3) / 3), //季度   
      'S': new Date(date).getMilliseconds()             //毫秒   
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (new Date(date).getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  GetLocation (callabck) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callabck)
    }
  },
  TimeOut (callback) {
    if (window.InitTimer === undefined) window.InitTimer = null
    window.clearTimeout(window.InitTimer)
    window.InitTimer = window.setTimeout(() => {
      window.clearTimeout(window.InitTimer)
      callback()
    }, 300)
  },
  ReplaceURLParams (url, params) {
    const args = { ...(params || {}), org: 'MQ' }
    return Object.keys(args).reduce((acc, k) => { // 此方法对每个牛币素进行处理
      const re = new RegExp(`:${k}(?!w)`, 'i')
      return acc.replace(re, args[k])
    }, url)
  },
  GetLotteryName (type) {
    switch (type) {
      case 'basketball':
        return '篮球'
      case 'football':
        return '足球'
      case 'lottery':
        return '大乐透'
      case 'double-color':
        return '双色球'
      case 'p3':
        return '排列3'
      case 'p5':
        return '排列5'
      default:
        return ''
    }
  },
  Axios (resolve, reject, target, context, payload = {}, code = 0, commit = null, params = null, hasdata = false) { // Axios
    let Data = null
    let Url = null
    if (payload.urlData !== undefined) {
      Url = this.ReplaceURLParams(target.url, payload.urlData)
    } else {
      Url = target.url
    }
    if (payload.queryData !== undefined) {
      Url += '?' + qs.stringify(payload.queryData)
    }
    if (payload.data !== undefined) {
      Data = payload.data
    }
    let Header = {}
    if (window.localStorage.Jwt !== undefined) { // 本地获取token
      Header['x-authorization-jwt'] = window.localStorage.Jwt
    }
    if (payload.headers !== undefined) {
      for (let key in payload.headers) {
        Header[key] = payload.headers[key]
      }
    }
    let aParams = {
      method: target.method,
      url: Url,
      data: Data,
      headers: { ...Header },
      baseURL: APIBase
    }
    Axios({ ...aParams }).then(res => {
      // console.log('response---->', res)
      const token = res.headers['X-Authorization-JWT'] || res.headers['x-authorization-jwt'] || res.headers['X-AUTHORIZATION-JWT']
      if (token) { // 更新本地存储token
        window.localStorage.Jwt = token
      }
      if (res.data.code - 0 === code - 0) {
        if (commit !== null) {
          context.commit(commit, params === null ? res.data.data : hasdata ? { ...params, data: res.data.data } : params)
        }
        resolve(res)
      } else {
        reject(res)
      }
    }).catch((res) => {
      reject(res)
    })
  },
  ChangeUrlParams (Arr, DeleteAll = false) {
    if (DeleteAll) { // 只保留目标参数
      window.history.pushState({}, 0, window.location.href.split('?')[0])
    }
    Arr.map((item) => {
      window.history.pushState(null, null, this.ChangeUrlArg(window.location.href, item.name, item.value))
    })
  },
  IsLeapYear (year) {
    return !(year % (year % 100 ? 4 : 400))
  },
  DoubleNum (num) { // 单位数补位
    return num > 9 ? num : `0${num}`
  },
  CheckEmail (target) { // 校验邮箱格式
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return reg.test(target)
  },
  GetUrlParams (name) { // 获取url参数
    let query = window.location.search.substring(1)
    let vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=')
      if (pair[0] == name) { return pair[1] }
    }
    return false
  },
  DateFormat (timestamp) { // 格式化时间
    timestamp = new Date(timestamp).getTime()
    let aDate = new Date(timestamp - 0)
    let yy = new Date(timestamp).getFullYear()
    let mm = new Date(timestamp).getMonth() + 1
    let dd = new Date(timestamp).getDate()
    let hh = aDate.getHours()
    let min = aDate.getMinutes()
    let ss = aDate.getSeconds()
    return `${yy}-${mm}-${dd} ${hh}:${min}:${ss}`
  },
  WindowClick (callback) { // window点击事件
    let WindowClickFn = window.onclick
    window.onclick = () => {
      if (WindowClickFn) {
        WindowClickFn()
      }
      callback()
    }
  },
  DocumentKeyDown (callback) { // document键盘输入事件
    let DocumentKeyDownFn = document.onkeydown
    document.onkeydown = (e) => {
      e = e || event
      if (DocumentKeyDownFn) {
        DocumentKeyDownFn()
      }
      callback(e)
    }
  },
  CheckUrl (url) { // 校验url
    let reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
    return reg.test(url)
  },
  ChangeUrlArg (url, arg, val) { // 替换url参数
    let pattern = arg + '=([^&]*)'
    let replaceText = arg + '=' + val
    if (url.match(pattern)) {
      let tmp = '/(' + arg + '=)([^&]*)/gi'
      tmp = url.replace(eval(tmp), replaceText)
      return tmp
    } else {
      if (url.match('[\?]')) {
        return url + '&' + replaceText
      } else {
        return url + '?' + replaceText
      }
    }
  }
}

export default ToolClass
