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

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { search } from '@/service/good'
const route = useRoute()
const router = useRouter()
const state = reactive({
  keyword: route.query.keyword || '',
  searchBtn: false,
  seclectActive: false,
  refreshing: false,
  list: [], 
  loading: false,
  finished: false,
  productList: [],
  totalPage: 0,
  page: 1,
  orderBy: '',
  // 测试数据
  mockProducts: [
    {
      goodsId: 1,
      goodsName: 'iPhone 13 128GB 九成新',
      goodsIntro: '毕业出售，无划痕，电池健康度90%，带原装充电器',
      goodsCoverImg: '/images/home/hot1.jpg',
      sellingPrice: 3999,
      originalPrice: 5999,
      tag: 'hot'
    },
    {
      goodsId: 2,
      goodsName: 'MacBook Air M1 13寸 八成新',
      goodsIntro: '考研结束，电脑保养很好，适合学习办公，带保护壳',
      goodsCoverImg: '/images/home/hot2.jpg',
      sellingPrice: 4999,
      originalPrice: 7999,
      tag: 'hot'
    },
    {
      goodsId: 3,
      goodsName: 'AirPods 2代 九成新',
      goodsIntro: '使用一年，音质完美，无杂音，带原装充电盒',
      goodsCoverImg: '/images/home/hot3.jpg',
      sellingPrice: 699,
      originalPrice: 1299,
      tag: 'hot'
    },
    {
      goodsId: 4,
      goodsName: 'iPad 2021 64GB 全新未拆',
      goodsIntro: '抽奖获得，全新未拆封，支持Apple Pencil，价格实惠',
      goodsCoverImg: '/images/home/hot4.jpg',
      sellingPrice: 2499,
      originalPrice: 3299,
      tag: 'new'
    },
    {
      goodsId: 5,
      goodsName: 'Apple Watch SE 八成新',
      goodsIntro: '运动手表，功能正常，表带可更换，适合健身使用',
      goodsCoverImg: '/images/home/new1.jpg',
      sellingPrice: 1299,
      originalPrice: 1999,
      tag: 'new'
    },
    {
      goodsId: 6,
      goodsName: 'Beats Solo3 九成新',
      goodsIntro: '头戴式耳机，音质出色，续航持久，适合图书馆学习',
      goodsCoverImg: '/images/home/new2.jpg',
      sellingPrice: 899,
      originalPrice: 1499,
      tag: 'hot'
    },
    {
      goodsId: 7,
      goodsName: '机械键盘 全新',
      goodsIntro: '青轴机械键盘，打字手感好，适合编程学习，全新未使用',
      goodsCoverImg: '/images/home/new3.jpg',
      sellingPrice: 299,
      originalPrice: 499,
      tag: 'new'
    },
    {
      goodsId: 8,
      goodsName: '小米音箱 八成新',
      goodsIntro: '智能音箱，音质不错，支持语音控制，宿舍必备',
      goodsCoverImg: '/images/home/new4.jpg',
      sellingPrice: 199,
      originalPrice: 299,
      tag: 'hot'
    },
    {
      goodsId: 9,
      goodsName: '自行车 九成新',
      goodsIntro: '捷安特山地车，毕业出售，车况良好，适合校园代步',
      goodsCoverImg: '/images/home/category1.jpg',
      sellingPrice: 599,
      originalPrice: 1299,
      tag: 'hot'
    },
    {
      goodsId: 10,
      goodsName: '显示器 24寸 八成新',
      goodsIntro: 'AOC显示器，1080P分辨率，适合学习办公，带HDMI线',
      goodsCoverImg: '/images/home/category2.jpg',
      sellingPrice: 399,
      originalPrice: 799,
      tag: 'new'
    },
    {
      goodsId: 11,
      goodsName: '台灯 护眼 九成新',
      goodsIntro: '飞利浦护眼台灯，光线柔和，适合夜间学习，带遥控器',
      goodsCoverImg: '/images/home/category3.jpg',
      sellingPrice: 89,
      originalPrice: 199,
      tag: 'hot'
    },
    {
      goodsId: 12,
      goodsName: '保温杯 全新',
      goodsIntro: '象印保温杯，500ml容量，保温效果好，全新未使用',
      goodsCoverImg: '/images/home/category4.jpg',
      sellingPrice: 59,
      originalPrice: 129,
      tag: 'new'
    }
  ]
}) 
//onfresh函数调用则是刷新(从第一页开始刷新)，可能是点击切换从第一页刷新，也可能是其他刷新方式
const init = async () => {
  const { categoryId } = route.query
  
  // 如果没有分类ID和关键词，使用测试数据
  // if (!categoryId && !state.keyword) {
    // 模拟API延迟
    setTimeout(() => {
      let filteredProducts = [...state.mockProducts]
      
      // 根据排序方式过滤数据
      if (state.orderBy === 'new') {
        filteredProducts = state.mockProducts.filter(item => item.tag === 'new')    //根据新品排序
      } else if (state.orderBy === 'price') {
        filteredProducts = state.mockProducts.sort((a, b) => a.sellingPrice - b.sellingPrice)  //根据价格排序
      }
      
      // 模拟分页
      const pageSize = 4
      const start = (state.page - 1) * pageSize
      const end = start + pageSize
      const currentPageData = filteredProducts.slice(start, end)
      
      if (state.refreshing) {
        state.productList = currentPageData
      } else {
        state.productList = state.productList.concat(currentPageData)
      }
      
      state.totalPage = Math.ceil(filteredProducts.length / pageSize)
      state.loading = false
      
      if (state.page >= state.totalPage) {
        state.finished = true
      }
    }, 500)
    return
  // }
  
  // 如果有真实数据，使用原来的逻辑
  // try {
  //   const { data, data: { list } } = await search({ pageNumber: state.page, goodsCategoryId: categoryId, keyword: state.keyword, orderBy: state.orderBy })
    
  //   if (state.refreshing) {
  //     state.productList = list
  //   } else {
  //     state.productList = state.productList.concat(list)
  //   }
    
  //   state.totalPage = data.totalPage
  //   state.loading = false
    
  //   if (state.page >= data.totalPage) {
  //     state.finished = true
  //   }
  // } catch (error) {
  //   console.error('搜索失败:', error)
  //   state.loading = false
  //   state.finished = true
  // }
}

const goBack = () => {
  router.go(-1)
}

const productDetail = (item) => {
  router.push({ path: `/product/${item.goodsId}` })
}

const getSearch = () => {
  onRefresh()
}

const onLoad = () => {
  // 如果没有分类ID和关键词，使用测试数据逻辑
  if (!route.query.categoryId && !state.keyword) {
    if (!state.refreshing && state.page < state.totalPage) {   //翻页加载
      state.page = state.page + 1
    }
    if (state.refreshing) {     //点击了切换之后，从头开始加载
      state.productList = [];
      state.refreshing = false;
    }
    init()
    return
  }
  
  // 原来的逻辑
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

const changeTab = ({ name }) => {
  console.log('name', name)
  state.orderBy = name
  onRefresh()
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.product-list-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;

  .category-header {
    .fj();
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #656771;
    z-index: 10000;

    &.active {
      background: @primary;
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
      .borderRadius(20px);

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
      background: @primary;
      .borderRadius(5px);
      margin-top: 10px;
    }
  }
}

.content {
  height: calc(~"(100vh - 80px)");
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 78px;
  background: #f8f9fa;
}

.product-list-refresh {
  .product-item {
    .fj();
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
      .boxSizing();

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
      .boxSizing();

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
          color: @primary;
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