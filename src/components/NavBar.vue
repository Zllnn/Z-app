<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <router-link tag="li" class="nav-list-item active" to="home">
        <i class="iconfont icon-lvsefenkaicankaoxianban-1"></i>
        <span>首页</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="category">
        <i class="iconfont icon-fenlei_"></i>
        <span>分类</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="cart">
        <i ><van-icon name="shopping-cart-o" :badge="!cart.count ? '' : cart.count" /></i>
        <span>购物车</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="user">
        <i class="iconfont icon-lvsefenkaicankaoxianban-"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { getLocal } from '@/common/js/utils'
import { useRouter } from 'vue-router'
const cart = useCartStore()
onMounted(() => {
  const token = getLocal('token')
  if (token) {
    cart.updateCart()
  }
})
//在跳转的时候进行判断，有的页面未登录不能跳转
const router = useRouter()
router.beforeEach((to: any, _from: any) => {
  const token = getLocal('token')
  if (to.name === 'cart' && !token) {
    router.push('/login')
  }
  //去个人页面需要判断是否登录
  if (to.name === 'user' && !token) {
    router.push('/login')
  }
})
</script>

<style lang="scss" scoped>
@use '../common/style/mixin.scss' as *;
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 1000;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);

  .nav-list {
    width: 100%;
    @include fj();
    flex-direction: row;
    padding: 0;

    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;

      &.router-link-active {
        color: $primary;
      }

      i {
        text-align: center;
        font-size: 22px;
      }

      span {
        font-size: 12px;
      }
    }
  }
}
</style>