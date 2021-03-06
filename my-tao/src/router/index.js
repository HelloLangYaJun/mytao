import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const components= {
  layout: () => import('@/views/layout/index'),
  index: () => import('@/views/index/index'),
  goods: () => import('@/views/goods/index'),
  myinfo: () => import('@/views/myinfo/index'),
  login: () =>import('@/views/myinfo/login/index'),
  openshop:()=>import('@/views/openshop/index'),
  chat:()=>import('@/views/chat/index'),
  message:()=>import('@/views/message/index'),
  shops:()=>import('@/views/shops/index')
}

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      component: components.layout,
      name: '母页',
      children: [
        {
          path: '/',
          component: components.index,
          name: '首页'
        },
        {
          path:'myinfo',
          component: components.myinfo,
          name: '个人信息'
        },
        {
          path:'message',
          component: components.message,
          name: '消息盒子'
        }
      ]
    },
    {
      path:'/login',
      component: components.login,
    },
    {
      path:'/shops',
      component: components.shops,
    },
    {
      path:'/goods',
      component: components.goods,
    },
    {
      path:'/openshop',
      component: components.openshop,
    },
    {
      path:'/chat',
      component: components.chat,
    }
  ]
})
