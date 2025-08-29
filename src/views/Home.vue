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

<script setup>
import { reactive, onMounted, nextTick } from 'vue'
import { getLocal } from '@/common/js/utils'
import { getHome } from '@/service/home'
import { showLoadingToast, closeToast, showToast } from 'vant'
import Swiper from '@/components/Swiper.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const goToDetail = (item) => {
  router.push({ path: `/product/${item.goodsId}` })
}

const tips = () => {
  showToast('功能开发中，敬请期待')
}
const state = reactive({
  isLogin: false, // 是否已登录
  swiperList: [
    {
      carouselId: 'swiper001',
      imgUrl: '/images/home/swiper1.jpg',
      redirectUrl: '/product/swiper001'
    },
    {
      carouselId: 'swiper002',
      imgUrl: '/images/home/swiper2.jpg',
      redirectUrl: '/product/swiper002'
    },
    {
      carouselId: 'swiper003',
      imgUrl: '/images/home/swiper3.jpg',
      redirectUrl: '/product/swiper003'
    }
  ], // 轮播图列表
  categoryList: [  //中部导航栏
    {
      name: '校园超市',
      imgUrl: '/images/home/category1.jpg',
      categoryId: 100001
    },
    {
      name: '校园地图',
      imgUrl: '/images/home/category2.jpg',
      categoryId: 100002
    }, 
     {
      name: '快递服务',
      imgUrl: '/images/home/category3.jpg',
      categoryId: 100005
    }, {
      name: '校园卡充值',
      imgUrl: '/images/home/category4.jpg',
      categoryId: 100006
    }, {
      name: '9.9拼好物',
      imgUrl: '/images/home/category5.jpg',
      categoryId: 100007
    }, {
      name: '9.9拼好物',
      imgUrl: '/images/home/category6.jpg',
      categoryId: 100007
    }, {
      name: '9.9拼好物',
      imgUrl: '/images/home/category7.jpg',
      categoryId: 100007
    },
    {
      name: '敬请期待',
      imgUrl: '/images/home/category8.jpg',
      categoryId: 100009
    },
  ],
  hots: [
    {
      goodsId: 'hot001',
      goodsName: '九成新自行车',
      goodsCoverImg: '/images/home/hot1.jpg',
      sellingPrice: 299
    },
    {
      goodsId: 'hot002',
      goodsName: '考研资料全套',
      goodsCoverImg: '/images/home/hot2.jpg',
      sellingPrice: 89
    },
    {
      goodsId: 'hot003',
      goodsName: '宿舍小冰箱',
      goodsCoverImg: '/images/home/hot3.jpg',
      sellingPrice: 199
    },
    {
      goodsId: 'hot004',
      goodsName: '二手吉他',
      goodsCoverImg: '/images/home/hot4.jpg',
      sellingPrice: 399
    }
  ], // 二手好物
  newGoodses: [
    {
      goodsId: 'new001',
      goodsName: '二手iPhone 12',
      goodsCoverImg: '/images/home/new1.jpg',
      sellingPrice: 2499
    },
    {
      goodsId: 'new002',
      goodsName: '笔记本电脑',
      goodsCoverImg: '/images/home/new2.jpg',
      sellingPrice: 1899
    },
    {
      goodsId: 'new003',
      goodsName: '宿舍台灯',
      goodsCoverImg: '/images/home/new3.jpg',
      sellingPrice: 59
    },
    {
      goodsId: 'new004',
      goodsName: '健身卡',
      goodsCoverImg: '/images/home/new4.jpg',
      sellingPrice: 199
    }
  ], // 热门推荐
  recommends: [
    {
      goodsId: 'rec001',
      goodsName: '蓝牙耳机',
      goodsCoverImg: '/images/home/rec1.jpg',
      sellingPrice: 129
    },
    {
      goodsId: 'rec002',
      goodsName: '宿舍电饭煲',
      goodsCoverImg: '/images/home/rec2.jpg',
      sellingPrice: 89
    },
    {
      goodsId: 'rec003',
      goodsName: '游戏手柄',
      goodsCoverImg: '/images/home/rec3.jpg',
      sellingPrice: 79
    },
    {
      goodsId: 'rec004',
      goodsName: '课外书籍',
      goodsCoverImg: '/images/home/rec4.jpg',
      sellingPrice: 29
    }
  ], // 最新上架
  headerScroll: false, // 滚动透明判断
})
onMounted(async () => {
  const token = getLocal('token')
  if (token) {
    state.isLogin = true
  }
  // showLoadingToast({
  //   message: '加载中...',
  //   forbidClick: true //是否在加载弹窗时，禁止点击
  // });
  // const { data } = await getHome()
  // //获取数据赋值
  // state.swiperList = data.carousels
  // state.swiperList = data.carousels
  // state.newGoodses = data.newGoodses
  // state.hots = data.hotGoodses
  // state.recommends = data.recommendGoodses
  // closeToast()
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