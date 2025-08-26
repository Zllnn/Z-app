<template>
  <div class="cart-box">
    <s-header :name="'购物车'"></s-header>
    <div class="cart-body">
      <van-swipe-cell :right-width="50" v-for="(item, index) in state.list" :key="index">
        <div class="good-item">
          <van-checkbox :name="item.cartItemId" />
          <div class="good-img"><img :src="$filters.prefix(item.goodsCoverImg)" alt=""></div>
          <div class="good-desc">
            <div class="good-title">
              <span>{{ item.goodsName }}</span>
              <span>x{{ item.goodsCount }}</span>
            </div>
            <div class="good-btn">
              <div class="price">¥{{ item.sellingPrice }}</div>
              <van-stepper integer :min="1" :max="5" :value="item.goodsCount" :name="item.cartItemId" async-change
                @change="onChange" />
            </div>
          </div>
        </div>
        <template #right>
          <van-button square icon="delete" type="danger" class="delete-button" @click="deleteGood(item.cartItemId)" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import { showToast, showLoadingToast, closeToast, showFailToast } from 'vant'
import sHeader from '@/components/SimpleHeader.vue'
import { getCart } from '@/service/cart'

const state = reactive({
  list: [ // 购物车商品列表（演示用假数据）
    {
      cartItemId: 101,
      goodsCoverImg: 'https://via.placeholder.com/100x100.png?text=Item+1',
      goodsName: '演示商品一',
      goodsCount: 1,
      sellingPrice: 199
    },
    {
      cartItemId: 102,
      goodsCoverImg: 'https://via.placeholder.com/100x100.png?text=Item+2',
      goodsName: '演示商品二',
      goodsCount: 2,
      sellingPrice: 89
    },
    {
      cartItemId: 103,
      goodsCoverImg: 'https://via.placeholder.com/100x100.png?text=Item+3',
      goodsName: '演示商品三',
      goodsCount: 1,
      sellingPrice: 59
    }
  ],
  result: [], // 选中的购物车商品 id 数组
})
// 根据假数据初始化选中项
state.result = state.list.map(item => item.cartItemId)
onMounted(() => {
  init()
})
const init = async () => {
  // 已有演示数据则不请求接口
  if (state.list.length > 0) return
  showLoadingToast({ message: '加载中...', forbidClick: true });
  const { data } = await getCart({ pageNumber: 1 })
  state.list = data
  state.result = data.map(item => item.cartItemId)
  closeToast()
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;

    .good-item {
      display: flex;

      .good-img {
        img {
          .wh(100px, 100px)
        }
      }

      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;

        .good-title {
          display: flex;
          justify-content: space-between;
        }

        .good-btn {
          display: flex;
          justify-content: space-between;

          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }

          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }

    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
}
</style>