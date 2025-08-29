<template>
  <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in props.list" :key="index">
      <img :src="item.imgUrl" alt="" @click="goTo(item.redirectUrl)">
    </van-swipe-item>
  </van-swipe>
</template>

<script setup lang="ts">
interface SwiperItem {
  imgUrl: string;
  redirectUrl: string;
}

// 通过 defineProps，获取父组件传入的参数
const props = defineProps<{
  list: SwiperItem[];
}>()
// 打开链接的方法
const goTo = (url: string) => {
  window.open(url)
}
</script>

<style lang='scss' scoped>
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>