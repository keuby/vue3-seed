import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/store',
    component: () => import(/* webpackChunkName: "store" */ '@/views/Store.vue')
  }
] as Array<RouteRecordRaw>
