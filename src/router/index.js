import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import userInfo from '@/components/userInfo'
import settings from '@/components/settings'
import userInfoSucc from '@/components/userInfoSucc'
import download from '@/components/download'

import allWorker from '@/components/workers/allWorker'
import searchWorker from '@/components/workers/searchWorker'
import workerDetail from '@/components/workers/workerDetail'
import orderAworker from '@/components/workers/orderAworker'
import historyOrder from '@/components/workers/historyOrder'

import paySweepCode from '@/components/orders/paySweepCode'
import manyOrders from '@/components/orders/manyOrders'
import allOrders from '@/components/orders/allOrders'
import orderDetail from '@/components/orders/orderDetail'
import cancelOrder from '@/components/orders/cancelOrder'
import payAll from '@/components/orders/payAll'
import payOnline from '@/components/orders/payOnline'
import payOffline from '@/components/orders/payOffline'
import evaluationOfWorkers from '@/components/orders/evaluationOfWorkers'

import disclaimer from '@/components/protocol/disclaimer'
import userProtocol from '@/components/protocol/userProtocol'
import aboutus from '@/components/protocol/aboutus'

import allProduct from '@/components/mall/allProduct'
import searchMall from '@/components/mall/searchMall'
import detailMall from '@/components/mall/detailMall'
import productDetail from '@/components/mall/productDetail'

import shareLogin from '@/components/shareProduct/shareLogin'
import confirmOrder from '@/components/shareProduct/confirmOrder'
import paySucc from '@/components/shareProduct/paySucc'

import test from '@/components/test'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component:allWorker
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/userInfo',
      name:'userInfo',
      component:userInfo
    },
    {
      path:'/settings',
      name:'settings',
      component:settings
    },
    {
      path:'/userInfoSucc',
      name:'userInfoSucc',
      component:userInfoSucc
    },
    {
      path:'/download',
      name:'download',
      component:download
    },
    {
      path:'/allWorker',
      name:'allWorker',
      component:allWorker
    },
    {
      path:'/searchWorker',
      name:'searchWorker',
      component:searchWorker
    },
    {
      path:'/workerDetail',
      name:'workerDetail',
      component:workerDetail
    },
    {
      path:'/orderAworker',
      name:'orderAworker',
      component:orderAworker
    },
    {
      path:'/historyOrder',
      name:'historyOrder',
      component:historyOrder
    },
    {
      path:'/paySweepCode/:id?',
      name:'paySweepCode',
      component:paySweepCode
    },
    {
      path:'/manyOrders',
      name:'manyOrders',
      component:manyOrders
    },
    {
      path:'/allOrders',
      name:'allOrders',
      component:allOrders
    },
    {
      path:'/orderDetail',
      name:'orderDetail',
      component:orderDetail
    },
    {
      path:'/cancelOrder',
      name:'cancelOrder',
      component:cancelOrder
    },
    {
      path:'/payAll',
      name:'payAll',
      component:payAll
    },
    {
      path:'/payOnline',
      name:'payOnline',
      component:payOnline
    },
    {
      path:'/evaluationOfWorkers',
      name:'evaluationOfWorkers',
      component:evaluationOfWorkers
    },
    {
      path:'/payOffline',
      name:'payOffline',
      component:payOffline
    },
    {
      path:'/disclaimer',
      name:'disclaimer',
      component:disclaimer
    },
    {
      path:'/userProtocol',
      name:'userProtocol',
      component:userProtocol
    },
    {
      path:'/aboutus',
      name:'aboutus',
      component:aboutus
    },
    {
      path:'/allProduct',
      name:'allProduct',
      component:allProduct
    },
    {
      path:'/searchMall',
      name:'searchMall',
      component:searchMall
    },
    {
      path:'/detailMall',
      name:'detailMall',
      component:detailMall
    },
    {
      path:'/productDetail',
      name:'productDetail',
      component:productDetail
    },
    {
      path:'/shareLogin',
      name:'shareLogin',
      component:shareLogin
    },
    {
      path:'/confirmOrder',
      name:'confirmOrder',
      component:confirmOrder
    },
    {
      path:'/paySucc',
      name:'paySucc',
      component:paySucc
    },
    {
      path:'/sharePaySucc',
      name:'sharePaySucc',
      component: resolve  => require(['@/components/shareProduct/sharePaySucc'],resolve)
    },
    {
      path:'/test',
      name:'test',
      component:test
    }
  ]
})
