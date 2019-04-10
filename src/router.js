import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/components/Dashboard.vue')
    },
    {
      path: '/nuevaorden',
      name: 'nuevaorden',
      component: () => import('@/components/NewOrder.vue')
    },
    {
      path: '/editarorden',
      name: 'editarorden',
      component: () => import('@/components/EditarOrden.vue')
    },
    {
      path: '/personalizar',
      name: 'custom',
      component: () => import('@/components/Personalizar.vue')
    }

  ]
})
