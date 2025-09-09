<template>
  <div class="address-box">
    <!-- 地址管理头部 -->
    <s-header :name="'地址管理'" :back="state.from == 'create-order' ? '' : '/user'"></s-header>
    <!-- 地址列表 -->
    <div class="address-item">
      <!--如果不是「我的」页面进来的，都是需要选择某一个地址，然后回调的-->
      <van-address-list v-if="state.from != 'mine'" v-model="state.chosenAddressId"  :list="state.list"
        default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="select" />
      <!--如果是「我的」页面进来的，只需浏览，添加等操作-->
      <van-address-list v-else v-model="state.chosenAddressId" :list="state.list" default-tag-text="默认" @add="onAdd"
        @edit="onEdit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import sHeader from '@/components/SimpleHeader.vue'
import { getAddressList } from '@/service/address'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { showToast } from 'vant'

const cart = useCartStore()
const route = useRoute()
const router = useRouter()

const state = reactive({
  chosenAddressId: '1',
  list: [] as any[], // 地址列表
  from: route.query.from // 获取来源，从哪个页面来的
})

onMounted(async () => {
  await initAddressList()
})

const initAddressList = async () => {
  try {
    const { data } = await getAddressList() // 获取地址列表
    state.list = data.map((item: any) => {
      return {
        id: item.addressId,
        name: item.userName,
        tel: item.userPhone,
        address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
        isDefault: !!item.defaultFlag,
        provinceName: item.provinceName,
        cityName: item.cityName,
        regionName: item.regionName,
        detailAddress: item.detailAddress
      }
    })
    
    // 设置默认选中的地址
    const defaultAddress = state.list.find(item => item.isDefault)
    if (defaultAddress) {
      state.chosenAddressId = defaultAddress.id.toString()
    }
  } catch (error) {
    console.error('获取地址列表失败:', error)
    showToast('加载地址失败')
  }
}

// 前往添加地址页面
const onAdd = () => {
  router.push({ path: 'address-edit', query: { type: 'add', from: state.from } })
}

// 前往地址编辑页面
const onEdit = (item: any) => {
  router.push({ path: 'address-edit', query: { type: 'edit', addressId: item.id, from: state.from } })
}

// 选择某个地址后，跳回订单生成页面
const select = (item: any, _index: any) => {
  cart.address = {
    userName: item.name,
    userPhone: item.tel,
    provinceName: item.provinceName,
    cityName: item.cityName,
    regionName: item.regionName,
    detailAddress: item.detailAddress
  }
  router.push({ path: 'create-order', query: { addressId: item.id, from: state.from } })
}
</script>

<style lang="scss">
@use '../common/style/mixin.scss' as *;

.address-box {
  .van-radio__icon {
    display: none;
  }

  .address-item {
    margin-top: 44px;

    .van-button {
      background: $primary;
      border-color: $primary;
    }
  }
}
</style>