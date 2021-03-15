/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import { Indicator } from 'mint-ui'

Vue.use(Router)

let RouterLoading = {
  show () { // 加载中显示loading组件
    Indicator.open({ spinnerType: 'fading-circle' }) // 开启loading组件，这里我用的mint-ui
  },
  resolve (resolve) { // 加载完成隐藏loading组件
    return component => {
      setTimeout(() => {
        Indicator.close() // 关闭loading组件
        resolve(component)
      }, 10)
    }
  }

}

let router = new Router({
  routes: [{
    path: '/', // 框架页
    name: 'sys',
    redirect: '/index',
    component: resolve => {
      require(['@/pages/index'], RouterLoading.resolve(resolve))
    },
    children: [
      {
        path: '/index', // 首页
        name: 'index',
        redirect: '/index/ShouYe',
        component: resolve => {
          require(['@/pages/index/index'], RouterLoading.resolve(resolve))
        },
        children: [
          {
            path: '/index/ShouYe', // 首页
            name: 'ShouYe',
            component: resolve => {
              require(['@/pages/index/ShouYe'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/index/AddToScreen', // 添加到主屏幕
            name: 'AddToScreen',
            component: resolve => {
              require(['@/pages/index/AddToScreen'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/ZuQiu', // 足球
            name: 'ZuQiu',
            component: resolve => {
              require(['@/pages/index/ZuQiu'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/ZuQiuDingDan', // 足球订单
            name: 'ZuQiuDingDan',
            component: resolve => {
              require(['@/pages/index/ZuQiuDingDan'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/LanQiu', // 篮球
            name: 'LanQiu',
            component: resolve => {
              require(['@/pages/index/LanQiu'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/LanQiuDingDan', // 篮球订单
            name: 'LanQiuDingDan',
            component: resolve => {
              require(['@/pages/index/LanQiuDingDan'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/DaLeTou', // 大乐透
            name: 'DaLeTou',
            component: resolve => {
              require(['@/pages/index/DaLeTou'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/DaLeTouDingDan', // 大乐透订单
            name: 'DaLeTouDingDan',
            component: resolve => {
              require(['@/pages/index/DaLeTouDingDan'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/ShuangSeQiu', // 双色球
            name: 'ShuangSeQiu',
            component: resolve => {
              require(['@/pages/index/ShuangSeQiu'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/ShuangSeQiuDingDan', // 双色球订单
            name: 'ShuangSeQiuDingDan',
            component: resolve => {
              require(['@/pages/index/ShuangSeQiuDingDan'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/PaiLie3', // 排列3
            name: 'PaiLie3',
            component: resolve => {
              require(['@/pages/index/PaiLie3'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/PaiLie3DingDan', // 排列3订单
            name: 'PaiLie3DingDan',
            component: resolve => {
              require(['@/pages/index/PaiLie3DingDan'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/PaiLie5', // 排列5
            name: 'PaiLie5',
            component: resolve => {
              require(['@/pages/index/PaiLie5'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/PaiLie5DingDan', // 排列5订单
            name: 'PaiLie5DingDan',
            component: resolve => {
              require(['@/pages/index/PaiLie5DingDan'], RouterLoading.resolve(resolve))
            }
          }, {
            path: '/index/DingDanZhiFuZhuangTai', // 订单支付状态
            name: 'DingDanZhiFuZhuangTai',
            component: resolve => {
              require(['@/pages/index/DingDanZhiFuZhuangTai'], RouterLoading.resolve(resolve))
            }
          }
        ]
      },
      {
        path: '/KaiJiangZhanShi', // 开奖展示
        name: 'KaiJiangZhanShi',
        redirect: '/KaiJiangZhanShi/SubIndex',
        component: resolve => {
          require(['@/pages/KaiJiangZhanShi/index'], RouterLoading.resolve(resolve))
        },
        children: [
          {
            path: '/KaiJiangZhanShi/SubIndex', // 开奖展示-首页
            name: 'KaiJiangZhanShiSubIndex',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/SubIndex'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/KaiJiangZhanShi/ZuQiu', // 开奖展示-足球
            name: 'KaiJiangZhanShiZuQiu',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/ZuQiu'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/KaiJiangZhanShi/LanQiu', // 开奖展示-篮球
            name: 'KaiJiangZhanShiLanQiu',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/LanQiu'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/KaiJiangZhanShi/ShuangSeQiu', // 开奖展示-双色球
            name: 'KaiJiangZhanShiShuangSeQiu',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/ShuangSeQiu'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/KaiJiangZhanShi/ShuangSeQiuXiangQing', // 开奖展示-双色球详情
            name: 'ShuangSeQiuXiangQing',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/ShuangSeQiuXiangQing'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/KaiJiangZhanShi/DaLeTou', // 开奖展示-大乐透
            name: 'KaiJiangZhanShiDaLeTou',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/DaLeTou'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/KaiJiangZhanShi/DaLeTouXiangQing', // 开奖展示-大乐透详情
            name: 'DaLeTouXiangQing',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/DaLeTouXiangQing'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/KaiJiangZhanShi/PaiLie3', // 开奖展示-排列3
            name: 'KaiJiangZhanShiPaiLie3',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/PaiLie3'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/KaiJiangZhanShi/PaiLie3XiangQing', // 开奖展示-排列3详情
            name: 'PaiLie3XiangQing',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/PaiLie3XiangQing'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/KaiJiangZhanShi/PaiLie5', // 开奖展示-排列5
            name: 'KaiJiangZhanShiPaiLie5',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/PaiLie5'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/KaiJiangZhanShi/PaiLie5XiangQing', // 开奖展示-排列5详情
            name: 'PaiLie5XiangQing',
            component: resolve => {
              require(['@/pages/KaiJiangZhanShi/PaiLie5XiangQing'], RouterLoading.resolve(resolve))
            }
          }
        ]
      },
      {
        path: '/WoDe', // 我的
        name: 'WoDe',
        redirect: '/WoDe/UserCenter',
        component: resolve => {
          require(['@/pages/WoDe/index'], RouterLoading.resolve(resolve))
        },
        children: [
          {
            path: '/WoDe/UserCenter', // 个人中心
            name: 'UserCenter',
            component: resolve => {
              require(['@/pages/WoDe/UserCenter'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/WoDe/WoDeCaiPiao', // 我的彩票
            name: 'WoDeCaiPiao',
            component: resolve => {
              require(['@/pages/WoDe/WoDeCaiPiao'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/WoDe/CaiPiaoXiangQing', // 彩票详情
            name: 'CaiPiaoXiangQing',
            component: resolve => {
              require(['@/pages/WoDe/CaiPiaoXiangQing'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/WoDe/ZhangHaoMingXi', // 账号明细
            name: 'ZhangHaoMingXi',
            component: resolve => {
              require(['@/pages/WoDe/ZhangHaoMingXi'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/WoDe/AnQuanZhongXin', // 安全中心
            name: 'AnQuanZhongXin',
            redirect: '/WoDe/AnQuanZhongXin/SubIndex',
            component: resolve => {
              require(['@/pages/WoDe/AnQuanZhongXin'], RouterLoading.resolve(resolve))
            },
            children: [
              {
                path: '/WoDe/AnQuanZhongXin/SubIndex', // 安全中心-首页
                name: 'ZhangHaoMingXiSubIndex',
                component: resolve => {
                  require(['@/pages/WoDe/AnQuanZhongXin/SubIndex'], RouterLoading.resolve(resolve))
                }
              },
              {
                path: '/WoDe/AnQuanZhongXin/YaoQingZhuCe', // 邀请注册
                name: 'YaoQingZhuCe',
                component: resolve => {
                  require(['@/pages/WoDe/AnQuanZhongXin/YaoQingZhuCe'], RouterLoading.resolve(resolve))
                }
              },
              {
                path: '/WoDe/AnQuanZhongXin/BangDingShouJi', // 绑定手机
                name: 'BangDingShouJi',
                component: resolve => {
                  require(['@/pages/WoDe/AnQuanZhongXin/BangDingShouJi'], RouterLoading.resolve(resolve))
                }
              }
            ]
          },
          {
            path: '/WoDe/GeRenSheZhi', // 个人设置
            name: 'GeRenSheZhi',
            redirect: '/WoDe/GeRenSheZhi/SheZhi',
            component: resolve => {
              require(['@/pages/WoDe/GeRenSheZhi'], RouterLoading.resolve(resolve))
            },
            children: [
              {
                path: '/WoDe/GeRenSheZhi/SheZhi', // 设置
                name: 'SheZhi',
                component: resolve => {
                  require(['@/pages/WoDe/GeRenSheZhi/SheZhi'], RouterLoading.resolve(resolve))
                }
              },
              {
                path: '/WoDe/GeRenSheZhi/ZhangHuSheZhi', // 账户设置
                name: 'ZhangHuSheZhi',
                redirect: '/WoDe/GeRenSheZhi/ZhangHuSheZhi/UserInfo',
                component: resolve => {
                  require(['@/pages/WoDe/GeRenSheZhi/ZhangHuSheZhi'], RouterLoading.resolve(resolve))
                },
                children: [
                  {
                    path: '/WoDe/GeRenSheZhi/ZhangHuSheZhi/UserInfo', // 用户信息
                    name: 'UserInfo',
                    component: resolve => {
                      require(['@/pages/WoDe/GeRenSheZhi/ZhangHuSheZhi/UserInfo'], RouterLoading.resolve(resolve))
                    }
                  },
                  {
                    path: '/WoDe/GeRenSheZhi/ZhangHuSheZhi/EditUserNick', // 修改用户昵称
                    name: 'EditUserNick',
                    component: resolve => {
                      require(['@/pages/WoDe/GeRenSheZhi/ZhangHuSheZhi/EditUserNick'], RouterLoading.resolve(resolve))
                    }
                  },
                  {
                    path: '/WoDe/GeRenSheZhi/ZhangHuSheZhi/EditTiXianMiMa', // 修改提现密码
                    name: 'EditTiXianMiMa',
                    component: resolve => {
                      require(['@/pages/WoDe/GeRenSheZhi/ZhangHuSheZhi/EditTiXianMiMa'], RouterLoading.resolve(resolve))
                    }
                  },
                  {
                    path: '/WoDe/GeRenSheZhi/ZhangHuSheZhi/EditMiMa', // 修改密码
                    name: 'EditMiMa',
                    component: resolve => {
                      require(['@/pages/WoDe/GeRenSheZhi/ZhangHuSheZhi/EditMiMa'], RouterLoading.resolve(resolve))
                    }
                  },
                  {
                    path: '/WoDe/GeRenSheZhi/ZhangHuSheZhi/BangDingShenFenZheng', // 绑定身份证
                    name: 'BangDingShenFenZheng',
                    component: resolve => {
                      require(['@/pages/WoDe/GeRenSheZhi/ZhangHuSheZhi/BangDingShenFenZheng'], RouterLoading.resolve(resolve))
                    }
                  },
                  {
                    path: '/WoDe/GeRenSheZhi/ZhangHuSheZhi/BangDingZhiFuBao', // 绑定支付宝
                    name: 'BangDingZhiFuBao',
                    component: resolve => {
                      require(['@/pages/WoDe/GeRenSheZhi/ZhangHuSheZhi/BangDingZhiFuBao'], RouterLoading.resolve(resolve))
                    }
                  }
                ]
              },
              {
                path: '/WoDe/GeRenSheZhi/GuanYuWoMen', // 关于我们
                name: 'GuanYuWoMen',
                component: resolve => {
                  require(['@/pages/WoDe/GeRenSheZhi/GuanYuWoMen'], RouterLoading.resolve(resolve))
                }
              }
            ]
          },
          {
            path: '/WoDe/XiaZaiErWeiMa', // 下载二维码
            name: 'XiaZaiErWeiMa',
            component: resolve => {
              require(['@/pages/WoDe/XiaZaiErWeiMa'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/WoDe/TiXian', // 提现
            name: 'TiXian',
            component: resolve => {
              require(['@/pages/WoDe/TiXian'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/WoDe/ChongZhi', // 充值
            name: 'ChongZhi',
            component: resolve => {
              require(['@/pages/WoDe/ChongZhi'], RouterLoading.resolve(resolve))
            }
          },
          {
            path: '/WoDe/ChongZhiZhuangTai', // 充值状态
            name: 'ChongZhiZhuangTai',
            component: resolve => {
              require(['@/pages/WoDe/ChongZhiZhuangTai'], RouterLoading.resolve(resolve))
            }
          }
        ]
      },
      {
        path: '/SignIn', // 登录
        name: 'SignIn',
        component: resolve => {
          require(['@/pages/SignIn'], RouterLoading.resolve(resolve))
        }
      },
      {
        path: '/ResetPassword', // 找回密码
        name: 'ResetPassword',
        component: resolve => {
          require(['@/pages/ResetPassword'], RouterLoading.resolve(resolve))
        }
      },
      {
        path: '/Register', // 注册
        name: 'Register',
        component: resolve => {
          require(['@/pages/Register'], RouterLoading.resolve(resolve))
        }
      }
    ]
  }]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router