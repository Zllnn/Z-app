<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header wrap">
        <i class="iconfont icon-fanhui" @click="goBack"></i>
        <div class="header-search">
          <i class="iconfont icon-search"></i>
          <input type="text" class="search-title" v-model="state.keyword" />
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#1baeae" @click-tab="changeTab">
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" class="product-list-refresh">
        <van-list v-model:loading="state.loading" :finished="state.finished"
          :finished-text="state.productList.length ? '没有更多了' : '搜索想要的商品'" @load="onLoad" @offset="10">
          <!-- <p v-for="item in list" :key="item">{{ item }}</p> -->
          <template v-if="state.productList.length">
               <div class="product-item" v-for="(item, index) in state.productList" :key="index"
               @click="productDetail(item)">
               <div class="product-image">
                 <img :src="item.goodsCoverImg" />
                 <div class="product-tag" v-if="item.tag">{{ item.tag === 'new' ? '新品' : '热门' }}</div>
               </div>
               <div class="product-info">
                 <p class="name">{{ item.goodsName }}</p>
                 <p class="subtitle">{{ item.goodsIntro }}</p>
                 <div class="price-section">
                   <span class="price">￥{{ item.sellingPrice }}</span>
                   <span class="original-price" v-if="item.originalPrice">￥{{ item.originalPrice }}</span>
                 </div>
               </div>
             </div>
          </template>
          <img class="empty" v-else src="https://s.yezgea02.com/1604041313083/kesrtd.png" alt="搜索">
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { search } from '@/service/good'
import { showToast } from 'vant'

const route = useRoute()
const router = useRouter()

const state = reactive({
  keyword: route.query.keyword || '',
  searchBtn: false,
  seclectActive: false,
  refreshing: false,
  list: [] as any[], 
  loading: false,
  finished: false,
  productList: [] as any[],
  totalPage: 0,
  page: 1,
  orderBy: '',
})

//onfresh函数调用则是刷新(从第一页开始刷新)，可能是点击切换从第一页刷新，也可能是其他刷新方式
const init = async () => {
  const { categoryId } = route.query
  
  try {
    const { data, data: { list } } = await search({ 
      pageNumber: state.page, 
      goodsCategoryId: categoryId, 
      keyword: state.keyword, 
      orderBy: state.orderBy 
    })
    
    if (state.refreshing) {
      state.productList = list
    } else {
      state.productList = state.productList.concat(list)
    }
    
    state.totalPage = data.totalPage
    state.loading = false
    
    if (state.page >= data.totalPage) {
      state.finished = true
    }
  } catch (error) {
    console.error('搜索失败:', error)
    showToast('搜索失败，请重试')
    state.loading = false
    state.finished = true
  }
}

const goBack = () => {
  router.go(-1)
}

const productDetail = (item: any) => {
  router.push({ path: `/product/${item.goodsId}` })
}

const getSearch = () => {
  onRefresh()
}

const onLoad = () => {
  if (!state.refreshing && state.page < state.totalPage) {   //翻页加载
    state.page = state.page + 1
  }
  if (state.refreshing) {     //点击了切换之后，从头开始加载
    state.productList = [];
    state.refreshing = false;
  }
  init()
}

const onRefresh = () => {
  state.refreshing = true
  state.finished = false
  state.loading = true
  state.page = 1
  onLoad()
}

const changeTab = ({ name }: { name: any }) => {
  console.log('name', name)
  state.orderBy = name
  onRefresh()
}
</script>

<style lang="scss" scoped>
@use '../common/style/mixin.scss' as *;

.product-list-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;

  .category-header {
    @include fj();
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    @include boxSizing();
    font-size: 15px;
    color: #656771;
    z-index: 10000;

    &.active {
      background: $primary;
    }

    .icon-left {
      font-size: 25px;
      font-weight: bold;
    }

    .header-search {
      display: flex;
      width: 76%;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #F7F7F7;
      @include borderRadius(20px);

      .iconfont {
        padding: 0 5px 0 20px;
        font-size: 17px;
      }

      .search-title {
        font-size: 12px;
        color: #666;
        background: #F7F7F7;
      }
    }

    .icon-More {
      font-size: 20px;
    }

    .search-btn {
      height: 28px;
      margin: 8px 0;
      line-height: 28px;
      padding: 0 5px;
      color: #fff;
      background: $primary;
      @include borderRadius(5px);
      margin-top: 10px;
    }
  }
}

.content {
  height: calc(100vh - 80px);
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 78px;
  background: #f8f9fa;
}

.product-list-refresh {
  .product-item {
    @include fj();
    width: 100%;
    height: 140px;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f8f9fa;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .product-image {
      position: relative;
      width: 140px;
      height: 140px;
      padding: 0 15px;
      @include boxSizing();

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }

      .product-tag {
        position: absolute;
        top: 8px;
        left: 15px;
        padding: 4px 8px;
        background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        color: white;
        font-size: 10px;
        border-radius: 12px;
        font-weight: bold;
        text-transform: uppercase;
      }
    }

    .product-info {
      width: 56%;
      height: 140px;
      padding: 10px;
      text-align: left;
      @include boxSizing();

      p {
        margin: 0
      }

      .name {
        width: 100%;
        max-height: 44px;
        line-height: 22px;
        font-size: 16px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .subtitle {
        width: 100%;
        max-height: 40px;
        padding: 8px 0;
        line-height: 20px;
        font-size: 13px;
        color: #666;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 12px;
      }

      .price-section {
        display: flex;
        align-items: center;
        gap: 8px;

        .price {
          color: $primary;
          font-size: 18px;
          font-weight: bold;
        }

        .original-price {
          color: #999;
          font-size: 14px;
          text-decoration: line-through;
        }
      }
    }
  }

  .empty {
    display: block;
    width: 150px;
    margin: 50px auto 20px;
  }
}
</style>