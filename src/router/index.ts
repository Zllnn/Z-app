import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: () => import('@/views/Home.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/Login.vue') },
  { path: '/category', name: 'category', component: () => import('@/views/Category.vue') },
  { path: '/cart', name: 'cart', component: () => import('@/views/Cart.vue') },
  { path: '/user', name: 'user', component: () => import('@/views/User.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/About.vue') },
  { path: '/detail', name: 'detail', component: () => import('@/views/Detail.vue') },
  { path: '/product-list', name: 'productList', component: () => import('@/views/ProductList.vue') },
  { path: '/product/:id', name: 'product', component: () => import('@/views/ProductDetail.vue') },
  { path: '/create-order', name: 'create-order', component: () => import('@/views/CreateOrder.vue') },
  { path: '/address', name: 'address', component: () => import('@/views/Address.vue') },
  { path: '/setting', name: 'setting', component: () => import('@/views/Setting.vue') },
  { path: '/address-edit', name: 'address-edit', component: () => import('@/views/AddressEdit.vue') },
  { path: '/order', name: 'order', component: () => import('@/views/Order.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router


