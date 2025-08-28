<template>
  <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in props.list" :key="index">
      <img :src="item.imgUrl" alt="" @click="goTo(item.redirectUrl)">
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
// 通过 defineProps，获取父组件传入的参数
const props = defineProps({
  list: {
    type: Array,
    default: []
  }
})
// 打开链接的方法
const goTo = (url) => {
  window.open(url)
}
</script>

<style lang='less' scoped>
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>