<template>
  <div class="product-detail">
    <!-- 商品详情头部 -->
    <s-header :name="'商品详情'"></s-header>
    <div class="detail-content">
      <!-- 商品轮播图 -->
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item v-for="(item, index) in state.detail.goodsCarouselList" :key="index">
            <img :src="item" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 商品信息 -->
      <div class="product-info">
        <div class="product-title">
          {{ state.detail.goodsName }}
        </div>
        <div class="product-desc">免费送到宿舍</div>
        <div class="product-price">
          <span>¥{{ state.detail.sellingPrice }}</span>
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <!-- 商品详情，此处接收后端返回的富文本 -->
        <div class="product-content" v-html="state.detail.goodsDetailContent"></div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="管理员" />
      <!--通过 cart.count 获取购物车的数量，赋值给模板-->
      <van-action-bar-icon icon="cart-o" :badge="!cart.count ? '' : cart.count" @click="goTo()" text="购物车" />
      <van-action-bar-button type="warning" @click="handleAddCart" text="加入购物车" />
      <van-action-bar-button type="danger" @click="goToCart" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getDetail } from '@/service/good'
import { addCart } from '@/service/cart'
import sHeader from '@/components/SimpleHeader.vue'
import { showSuccessToast, showFailToast, showLoadingToast, closeToast } from 'vant'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const router = useRouter()
const route = useRoute()

const state = reactive({
  detail: {
    goodsId: '',
    goodsCarouselList: [] as string[],
    goodsName: '',
    sellingPrice: 0,
    goodsDetailContent: ''
  }
})

onMounted(async () => {
  await initProductDetail()
})

const initProductDetail = async () => {
  try {
    // 从路由中提取商品 id 作为获取商品详情的参数
    const { id } = route.params
    if (!id) {
      showFailToast('商品ID不存在')
      return
    }
    
    showLoadingToast({ message: '加载中...', forbidClick: true })
    const { data } = await getDetail(id)
    console.log(data)
    
    state.detail = data
    cart.updateCart() // 每次进入详情页的时候，默认更新一次购物车状态数据
    closeToast()
  } catch (error) {
    console.error('获取商品详情失败:', error)
    closeToast()
    showFailToast('加载商品详情失败')
  }
}

const goTo = () => {
  router.push({ path: '/cart' })
}

const handleAddCart = async () => {
  try {
    // 添加购物车
    const { data, code } = await addCart({ 
      goodsCount: 1, 
      goodsId: state.detail.goodsId 
    })
    
    if (code == 1) {
      showSuccessToast('添加成功')
      cart.updateCart() // 每次添加成功，更新一次购物车状态数据
    } else {
      showFailToast('添加失败')
    }
  } catch (error) {
    console.error('添加购物车失败:', error)
    showFailToast('添加失败')
  }
}

//立即购买
const goToCart = async () => {
  try {
    // 前往购物车页面前，先添加到购物车
    const { data, code } = await addCart({ 
      goodsCount: 1, 
      goodsId: state.detail.goodsId 
    })
    
    if (code == 1) {
      cart.updateCart() // 前往购物车页面前，再更新一次状态
      router.push({ path: '/cart' })
    } else {
      showFailToast('添加失败')
    }
  } catch (error) {
    console.error('添加购物车失败:', error)
    showFailToast('添加失败')
  }
}
</script>

<style lang="scss">
@use '../common/style/mixin.scss' as *;

.product-detail {
  .detail-header {
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

    .product-name {
      font-size: 14px;
    }
  }

  .detail-content {
    margin-top: 44px;

    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }

    .product-info {
      padding: 0 10px;

      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }

      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }

      .product-price {
        @include fj();

        span:nth-child(1) {
          color: #F63515;
          font-size: 22px;
        }

        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }

    .product-intro {
      width: 100%;

      ul {
        @include fj();
        width: 100%;
        margin: 10px 0;

        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;

          &:last-child {
            border-right: none;
          }
        }
      }

      .product-content {
        padding: 0 20px;

        img {
          width: 100%;
        }
      }
    }
  }

  .van-goods-action-button--warning {
    background: linear-gradient(to right, #6bd8d8, $primary)
  }

  .van-goods-action-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888)
  }
}
</style>