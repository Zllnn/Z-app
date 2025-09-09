<template>
  <div class="home">
    <!-- 首页头部搜索条 -->
    <header class="home-header wrap" :class="{ 'active': state.headerScroll }">
      <router-link tag="i" to="./category"><i class="nbicon nbmenu2"></i></router-link>
      <div class="header-search">
        <span class="app-name">Z-app</span>
        <i class="iconfont icon-search"></i>
        <router-link tag="span" class="search-title" to="./product-list">修德.博学.求实.创新</router-link>
      </div>
      <router-link class="login" tag="span" to="./login" v-if="!state.isLogin">登录</router-link>
      <router-link class="login" tag="span" to="./user" v-else>
        <van-icon name="manager-o" />
      </router-link>
    </header>

    <!-- 封装的导航条 -->
    <Swiper :list="state.swiperList"></Swiper>

    <!-- 首页中部导航 -->
    <div class="category-list">
      <div v-for="item in state.categoryList" v-bind:key="item.categoryId" @click="tips">
        <img :src="item.imgUrl">
        <span>{{ item.name }}</span>
      </div>
    </div>

    <!-- 首页下部，推荐 -->
    <div class="good">
      <header class="good-header">热门推荐</header>
      <div class="good-box">
        <div class="good-item" v-for="item in state.newGoodses" :key="item.goodsId" @click="goToDetail(item)">
          <img :src="item.goodsCoverImg" alt="">
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">¥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <header class="good-header">二手好物</header>
      <div class="good-box">
        <div class="good-item" v-for="item in state.hots" :key="item.goodsId" @click="goToDetail(item)">
          <!-- <img :src="$filters.prefix(item.goodsCoverImg)" alt=""> -->
          <img :src="item.goodsCoverImg" alt="">
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">¥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good" :style="{ paddingBottom: '100px'}">
      <header class="good-header">最新上架</header>
      <div class="good-box">
        <div class="good-item" v-for="item in state.recommends" :key="item.goodsId" @click="goToDetail(item)">
          <!-- <img :src="$filters.prefix(item.goodsCoverImg)" alt=""> -->
          <img :src="item.goodsCoverImg" alt="">
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">¥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, nextTick } from 'vue'
import { getLocal } from '@/common/js/utils'
import { getHome } from '@/service/home'
import { showLoadingToast, closeToast, showToast } from 'vant'
import Swiper from '@/components/Swiper.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToDetail = (item: any) => {
  router.push({ path: `/product/${item.goodsId}` })
}

const tips = () => {
  showToast('功能开发中，敬请期待')
}

const state = reactive({
  isLogin: false, // 是否已登录
  swiperList: [] as any[], // 轮播图列表
  categoryList: [] as any[], //中部导航栏
  hots: [] as any[], // 二手好物
  newGoodses: [] as any[], // 热门推荐
  recommends: [] as any[], // 最新上架
  headerScroll: false, // 滚动透明判断
})

onMounted(async () => {
  const token = getLocal('token')
  if (token) {
    state.isLogin = true
  }
  
  showLoadingToast({
    message: '加载中...',
    forbidClick: true //是否在加载弹窗时，禁止点击
  });
  
  try {
    const { data } = await getHome()
    //获取数据赋值
    state.swiperList = data.carousels || []
    state.newGoodses = data.newGoods || []
    state.hots = data.hotGoods || []
    state.recommends = data.recommendGoods || []
    closeToast()
  } catch (error) {
    console.error('获取首页数据失败:', error)
    closeToast()
    showToast('数据加载失败')
  }
})

// 必须要等到页面DOM渲染结束后再执行下面的方法，否则无效 ，对滚动条监听
nextTick(() => {
  document.body.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    scrollTop > 100 ? state.headerScroll = true : state.headerScroll = false
  })
})


</script>

<style lang="scss" scoped>
@use '../common/style/mixin.scss' as *;

.home {
  .home-header {
    position: fixed;
    left: 0;
    top: 0;
    @include wh(100%, 50px);
    @include fj();
    line-height: 50px;
    padding: 0 15px;
    @include boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 10000;

    .nbmenu2 {
      color: $primary;
    }

    &.active {
      background: $primary;

      .nbmenu2 {
        color: #fff;
      }

      .login {
        color: #fff;
      }
    }

    .header-search {
      display: flex;
      @include wh(74%, 20px);
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: rgba(255, 255, 255, .7);
      border-radius: 20px;

      .app-name {
        padding: 0 10px;
        color: $primary;
        font-size: 20px;
        font-weight: bold;
        border-right: 1px solid #666;
      }

      .icon-search {
        padding: 0 10px;
        font-size: 17px;
      }

      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
    }

    .login {
      color: $primary;
      line-height: 52px;

      .van-icon-manager-o {
        font-size: 20px;
        vertical-align: -3px;
      }
    }
     &.active {
       background: $primary;
    
       .nbmenu2 {
         color: #fff;
       }
    
       .login {
         color: #fff;
       }
     }
  }
    .category-list {
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      width: 100%;
      padding-bottom: 13px;

    div {
      display: flex;
      flex-direction: column;
      width: 20%;
      text-align: center;

    img {
      @include wh(36px, 36px);
      margin: 13px auto 8px auto;
    }
  }
}
.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: $primary;
    font-size: 16px;
    font-weight: 500;
  }

  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1PX solid #e9e9e9;
      padding: 10px 0;

      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }

      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;

        .title {
          color: #222333;
        }

        .price {
          color: $primary;
        }
      }

      &:nth-child(2n + 1) {
        border-right: 1PX solid #e9e9e9;
      }
    }
  }
}
}
</style>