<template>
<router-view></router-view>
<NavBar v-if="state.isShowNav"></NavBar>
</template>

<script setup>
import { reactive } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
const router = useRouter()
const needNavList = ['home', 'category', 'cart'] // 需要导航的页面
const state = reactive({
  isShowNav: true // 是否显示导航
})
router.beforeEach((to, from) => {
  // 如果前往的页面是在 needNavList 数组内的，则显示导航
  if (needNavList.includes(to.name)) {
    state.isShowNav = true
  } else {
    state.isShowNav = false
  }
})
</script>


<style lang="less">
@import '@/common/style/mixin';
html,
body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>