<template>
  <div class="category-box">
    <header class="category-header wrap">
      <i class="iconfont icon-fanhui"></i>
      <div class="header-search">
        <i class="iconfont icon-search"></i>
        <router-link tag="span" class="search-title" to="./product-list?from=category">样样两元，全场两元</router-link>
      </div>
      <i class="iconfont icon-more"></i>
    </header>
    <div class="search-wrap" ref="searchWrap">
      <list-scroll :scroll-data="state.categoryData" class="nav-side-wrapper">
        <ul class="nav-side">
          <li v-for="item in state.categoryData" :key="item.categoryId" v-text="item.categoryName"
            :class="{ 'active': currentIndex == item.categoryId }" @click="selectMenu(item.categoryId)"></li>
        </ul>
      </list-scroll>
      <div class="search-content">
        <list-scroll :scroll-data="state.categoryData" >
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <template v-for="(category, index) in state.categoryData">
                <div class="swiper-slide" v-if="state.currentIndex == category.categoryId" :key="index">
                  <!-- <img class="category-main-img" :src="category.mainImgUrl" v-if="category.mainImgUrl"/> -->
                  <div class="category-list" v-for="(products, index) in category.secondLevelCategoryVOS" :key="index">
                    <p class="catogory-title">{{ products.categoryName }}</p>
                    <div class="product-item" v-for="(product, index) in products.thirdLevelCategoryVOS" :key="index"
                      @click="selectProduct(product)">
                      <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" class="product-img" />
                      <p v-text="product.categoryName" class="product-title"></p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </list-scroll>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { getCategory } from "@/service/good"
import { useRouter } from 'vue-router'

const router = useRouter()
// composition API 获取 refs 的形式
const searchWrap = ref(null)
const state = reactive({
  categoryData: [],
  currentIndex: 1,
  // 测试数据 - 校园二手商品分类
  mockCategoryData: [
    {
      categoryId: 1,
      categoryName: '数码电子',
      mainImgUrl: '/images/home/category1.jpg',
      secondLevelCategoryVOS: [
        {
          categoryName: '手机数码',
          thirdLevelCategoryVOS: [
            { categoryId: 101, categoryName: 'iPhone' },
            { categoryId: 102, categoryName: 'Android' },
            { categoryId: 103, categoryName: '平板电脑' },
            { categoryId: 104, categoryName: '智能手表' }
          ]
        },
        {
          categoryName: '电脑办公',
          thirdLevelCategoryVOS: [
            { categoryId: 105, categoryName: '笔记本' },
            { categoryId: 106, categoryName: '台式机' },
            { categoryId: 107, categoryName: '键盘鼠标' },
            { categoryId: 108, categoryName: '显示器' }
          ]
        },
        {
          categoryName: '音频设备',
          thirdLevelCategoryVOS: [
            { categoryId: 109, categoryName: '蓝牙耳机' },
            { categoryId: 110, categoryName: '蓝牙音箱' },
            { categoryId: 111, categoryName: '麦克风' },
            { categoryId: 112, categoryName: '录音笔' }
          ]
        }
      ]
    },
    {
      categoryId: 2,
      categoryName: '学习用品',
      mainImgUrl: '/images/home/category2.jpg',
      secondLevelCategoryVOS: [
        {
          categoryName: '书籍资料',
          thirdLevelCategoryVOS: [
            { categoryId: 201, categoryName: '教材课本' },
            { categoryId: 202, categoryName: '考研二手' },
            { categoryId: 203, categoryName: '英语学习' },
            { categoryId: 204, categoryName: '专业书籍' }
          ]
        },
        {
          categoryName: '文具用品',
          thirdLevelCategoryVOS: [
            { categoryId: 205, categoryName: '笔类' },
            { categoryId: 206, categoryName: '笔记本' },
            { categoryId: 207, categoryName: '尺子' },
            { categoryId: 208, categoryName: '计算器' }
          ]
        },
        {
          categoryName: '办公用品',
          thirdLevelCategoryVOS: [
            { categoryId: 209, categoryName: '文件夹' },
            { categoryId: 210, categoryName: '订书机' },
            { categoryId: 211, categoryName: '胶水' },
            { categoryId: 212, categoryName: '便利贴' }
          ]
        }
      ]
    },
    {
      categoryId: 3,
      categoryName: '宿舍生活',
      mainImgUrl: '/images/home/category3.jpg',
      secondLevelCategoryVOS: [
        {
          categoryName: '宿舍用品',
          thirdLevelCategoryVOS: [
            { categoryId: 301, categoryName: '台灯' },
            { categoryId: 302, categoryName: '床品' },
            { categoryId: 303, categoryName: '收纳盒' },
            { categoryId: 304, categoryName: '衣架' }
          ]
        },
        {
          categoryName: '个人护理',
          thirdLevelCategoryVOS: [
            { categoryId: 305, categoryName: '护肤品' },
            { categoryId: 306, categoryName: '化妆品' },
            { categoryId: 307, categoryName: '香水' },
            { categoryId: 308, categoryName: '美妆工具' }
          ]
        },
        {
          categoryName: '运动健身',
          thirdLevelCategoryVOS: [
            { categoryId: 309, categoryName: '运动鞋' },
            { categoryId: 310, categoryName: '运动服' },
            { categoryId: 311, categoryName: '健身器材' },
            { categoryId: 312, categoryName: '瑜伽垫' }
          ]
        }
      ]
    },
    {
      categoryId: 4,
      categoryName: '校园代步',
      mainImgUrl: '/images/home/category4.jpg',
      secondLevelCategoryVOS: [
        {
          categoryName: '自行车',
          thirdLevelCategoryVOS: [
            { categoryId: 401, categoryName: '山地车' },
            { categoryId: 402, categoryName: '公路车' },
            { categoryId: 403, categoryName: '折叠车' },
            { categoryId: 404, categoryName: '电动车' }
          ]
        },
        {
          categoryName: '滑板轮滑',
          thirdLevelCategoryVOS: [
            { categoryId: 405, categoryName: '滑板' },
            { categoryId: 406, categoryName: '轮滑鞋' },
            { categoryId: 407, categoryName: '长板' },
            { categoryId: 408, categoryName: '电动滑板' }
          ]
        }
      ]
    },
    {
      categoryId: 5,
      categoryName: '时尚穿搭',
      mainImgUrl: '/images/home/category5.jpg',
      secondLevelCategoryVOS: [
        {
          categoryName: '男装',
          thirdLevelCategoryVOS: [
            { categoryId: 501, categoryName: 'T恤' },
            { categoryId: 502, categoryName: '衬衫' },
            { categoryId: 503, categoryName: '外套' },
            { categoryId: 504, categoryName: '牛仔裤' }
          ]
        },
        {
          categoryName: '女装',
          thirdLevelCategoryVOS: [
            { categoryId: 505, categoryName: '连衣裙' },
            { categoryId: 506, categoryName: '上衣' },
            { categoryId: 507, categoryName: '外套' },
            { categoryId: 508, categoryName: '半身裙' }
          ]
        },
        {
          categoryName: '配饰',
          thirdLevelCategoryVOS: [
            { categoryId: 509, categoryName: '帽子' },
            { categoryId: 510, categoryName: '围巾' },
            { categoryId: 511, categoryName: '双肩包' },
            { categoryId: 512, categoryName: '首饰' }
          ]
        }
      ]
    },
    {
      categoryId: 6,
      categoryName: '休闲娱乐',
      mainImgUrl: '/images/home/category6.jpg',
      secondLevelCategoryVOS: [
        {
          categoryName: '游戏设备',
          thirdLevelCategoryVOS: [
            { categoryId: 601, categoryName: 'Switch' },
            { categoryId: 602, categoryName: '手柄' },
            { categoryId: 603, categoryName: 'VR设备' },
            { categoryId: 604, categoryName: '游戏耳机' }
          ]
        },
        {
          categoryName: '桌游棋牌',
          thirdLevelCategoryVOS: [
            { categoryId: 605, categoryName: '扑克牌' },
            { categoryId: 606, categoryName: '象棋' },
            { categoryId: 607, categoryName: '围棋' },
            { categoryId: 608, categoryName: '狼人杀' }
          ]
        }
      ]
    }
  ]
})
onMounted(async () => {
  // 这个操作是为了将 searchWrap 这个节点撑满屏幕，否则底部会留白
  // let $screenHeight = document.documentElement.clientHeight
  // console.log('searchWrap.value', searchWrap.value)
  // searchWrap.value.style.height = $screenHeight - 100 + 'px'
  
  // try {
  //   const { data } = await getCategory()
  //   state.categoryData = data
  // } catch (error) {
  //   console.log('使用测试数据:', error)
  //   // 如果API调用失败，使用测试数据
  //   state.categoryData = state.mockCategoryData
  // }
  state.categoryData = state.mockCategoryData
})
const selectMenu = (index) => {
  state.currentIndex = index
}
//选择跳转函数
const selectProduct = (item) => {
  router.push({ path: 'product-list', query: { categoryId: item.categoryId } })
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.category-box {
  .category-header {
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    .fj();
    .wh(100%, 50px);
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
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
      width: 80%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #F7F7F7;
      border-radius: 20px;

      .iconfont {
        padding: 0 10px 0 20px;
        font-size: 17px;
      }

      .search-title {
        font-size: 12px;
        color: #666;
      }
    }
  }
  .search-wrap {
  .fj();
  width: 100%;
  margin-top: 50px;
  background: #F8F8F8;

  .nav-side-wrapper {
    width: 28%;
    height: 100%;
    overflow: hidden;

    .nav-side {
      width: 100%;
      .boxSizing();
      background: #F8F8F8;

      li {
        width: 100%;
        height: 56px;
        text-align: center;
        line-height: 56px;
        font-size: 14px;

        &.active {
          color: @primary;
          background: #fff;
        }
      }
    }
  }

  .search-content {
    width: 72%;
    height: 100%;
    padding: 0 10px;
    background: #fff;
    overflow-y: scroll;
    touch-action: pan-y;

    * {
      touch-action: pan-y;
    }

    .boxSizing();

    .swiper-container {
      width: 100%;

      .swiper-slide {
        width: 100%;

        .category-main-img {
          width: 100%;
        }

        .category-list {
          display: flex;
          flex-wrap: wrap;
          flex-shrink: 0;
          width: 100%;

          .catogory-title {
            width: 100%;
            font-size: 17px;
            font-weight: 500;
            padding: 20px 0;
          }

          .product-item {
            width: 33.3333%;
            margin-bottom: 10px;
            text-align: center;
            font-size: 15px;

            .product-img {
              .wh(30px, 30px);
            }
          }
        }
      }
    }
  }
}
}

</style>