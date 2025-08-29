<template>
  <header class="simple-header">
    <i class="iconfont icon-fanhui" @click="goBack"></i>
    <div class="simple-header-title">{{ props.name }}</div>
    <i class="iconfont icon-more"></i>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@use '../common/style/mixin.scss' as *;

.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  @include fj();
  @include wh(100%, 44px);
  line-height: 44px;
  padding: 0 10px;
  @include boxSizing();
  color: #252525;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;

  .simple-header-title {
    font-size: 14px;
  }
}
</style>