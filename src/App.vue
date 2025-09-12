<template>
<router-view v-slot="{ Component }">
  <KeepAlive :include="cachedComponents">
    <component :is="Component" :key="$route.path" />
  </KeepAlive>
</router-view>
<NavBar v-if="state.isShowNav"></NavBar>
</template>

<script setup lang="ts">

import { reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const needNavList = ['home', 'category', 'cart'] // 需要导航的页面
const state = reactive({
  isShowNav: true // 是否显示导航
})

// 计算需要缓存的组件名称
const cachedComponents = computed(() => {
  const components = []
  if (route.meta?.keepAlive) {
    components.push(route.name)
  }
  return components
})

//路由前置守卫判断页面是否需要导航栏
router.beforeEach((to: any, _from: any) => {
  // 如果前往的页面是在 needNavList 数组内的，则显示导航
  if (to.name && needNavList.includes(to.name as string)) {
    state.isShowNav = true
  } else {
    state.isShowNav = false
  }
})
</script>


<style lang="scss">
@use '@/common/style/mixin.scss' as *;
html,
body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>