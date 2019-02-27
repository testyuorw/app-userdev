let routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/components/workers/allWorker')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/login'),
        meta:{
            needLogin:false
        }
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('@/components/userInfo')
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/components/settings')
    },
    {
        path: '/userInfoSucc',
        name: 'userInfoSucc',
        component: () => import('@/components/userInfoSucc')
    },
    {
        path: '/download',
        name: 'download',
        component: () => import('@/components/download')
    },
    {
        path: '/allWorker',
        name: 'allWorker',
        component: () => import('@/components/workers/allWorker')
    },
    {
        path: '/searchWorker',
        name: 'searchWorker',
        component: () => import('@/components/workers/searchWorker')
    },
    {
        path: '/workerDetail',
        name: 'workerDetail',
        component: () => import('@/components/workers/workerDetail')
    },
    {
        path: '/orderAworker',
        name: 'orderAworker',
        component: () => import('@/components/workers/orderAworker')
    },
    {
        path: '/historyOrder',
        name: 'historyOrder',
        component: () => import('@/components/workers/historyOrder')
    },
    {
        path: '/paySweepCode/:id?',
        name: 'paySweepCode',
        component: () => import('@/components/orders/paySweepCode'),
        meta:{
            needLogin:false
        }
    },
    {
        path: '/manyOrders',
        name: 'manyOrders',
        component: () => import('@/components/orders/manyOrders')
    },
    {
        path: '/allOrders',
        name: 'allOrders',
        component: () => import('@/components/orders/allOrders')
    },
    {
        path: '/orderDetail',
        name: 'orderDetail',
        component: () => import('@/components/orders/orderDetail')
    },
    {
        path: '/cancelOrder',
        name: 'cancelOrder',
        component: () => import('@/components/orders/cancelOrder')
    },
    {
        path: '/payAll',
        name: 'payAll',
        component: () => import('@/components/orders/payAll')
    },
    {
        path: '/payOnline',
        name: 'payOnline',
        component: () => import('@/components/orders/payOnline')
    },
    {
        path: '/evaluationOfWorkers',
        name: 'evaluationOfWorkers',
        component: () => import('@/components/orders/evaluationOfWorkers')
    },
    {
        path: '/payOffline',
        name: 'payOffline',
        component: () => import('@/components/orders/payOffline')
    },
    {
        path: '/disclaimer',
        name: 'disclaimer',
        component: () => import('@/components/protocol/disclaimer')
    },
    {
        path: '/userProtocol',
        name: 'userProtocol',
        component: () => import('@/components/protocol/userProtocol')
    },
    {
        path: '/aboutus',
        name: 'aboutus',
        component: () => import('@/components/protocol/aboutus')
    },
    {
        path: '/allProduct',
        name: 'allProduct',
        component: () => import('@/components/mall/allProduct')
    },
    {
        path: '/searchMall',
        name: 'searchMall',
        component: () => import('@/components/mall/searchMall')
    },
    {
        path: '/detailMall',
        name: 'detailMall',
        component: () => import('@/components/mall/detailMall')
    },
    {
        path: '/productDetail',
        name: 'productDetail',
        component: () => import('@/components/mall/productDetail')
    },
    {
        path: '/shareLogin',
        name: 'shareLogin',
        component: () => import('@/components/shareProduct/shareLogin')
    },
    {
        path: '/confirmOrder',
        name: 'confirmOrder',
        component: () => import('@/components/shareProduct/confirmOrder')
    },
    {
        path: '/paySucc',
        name: 'paySucc',
        component: () => import('@/components/shareProduct/paySucc')
    },
    {
        path: '/sharePaySucc',
        name: 'sharePaySucc',
        component: () => import('@/components/shareProduct/sharePaySucc')
    }
];

export default routes;