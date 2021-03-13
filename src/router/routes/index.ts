import { RouteRecordRaw } from 'vue-router'
import Home from '@/pages/home/index.vue'

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/store',
    component: () => import(/* webpackChunkName: "store" */ '@/pages/store/index.vue'),
  },
] as Array<RouteRecordRaw>
