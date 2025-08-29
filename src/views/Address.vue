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

<script setup>
import { reactive, onMounted } from 'vue'
import sHeader from '@/components/SimpleHeader.vue'
import { getAddressList } from '@/service/address'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
  chosenAddressId: '1',
  list: [
    {
      id: 1,
      name: '张三',
      tel: '13800138000',
      address: '北京市东城区东华门街道王府井大街88号',
      isDefault: true
    },
    {
      id: 2,
      name: '李四',
      tel: '13800138001',
      address: '北京市东城区东华门街道王府井大街88号',
      isDefault: false
    },
    {
      id: 3,
      name: '王五',
      tel: '13800138002',
      address: '北京市东城区东华门街道王府井大街88号',
      isDefault: false
    }
  ], // 地址列表
  from: route.query.from // 获取来源，从哪个页面来的
})
onMounted(async () => {
  state.list = cart.addressList
  // const { data } = await getAddressList() // 获取地址列表
  // state.list = data.map(item => {
  //   return {
  //     id: item.addressId,
  //     name: item.userName,
  //     tel: item.userPhone,
  //     address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
  //     isDefault: !!item.defaultFlag
  //   }
  // })
})
// 前往添加地址页面
const onAdd = () => {
  router.push({ path: 'address-edit', query: { type: 'add', from: state.from } })
}
// 前往地址编辑页面
const onEdit = (item) => {
  router.push({ path: 'address-edit', query: { type: 'edit', addressId: item.id, from: state.from } })
}
// 选择某个地址后，跳回订单生成页面
const select = (item, index) => {
  cart.address = {
    userName: item.name,
    userPhone: item.tel,
    provinceName: item.provinceName,
    cityName: item.cityName,
    regionName: item.regionName,
    detailAddress: item.address
  }
  router.push({ path: 'create-order', query: { addressId: item.id, from: state.from } })
}
</script>

<style lang="less">
@import '../common/style/mixin';

.address-box {
  .van-radio__icon {
    display: none;
  }

  .address-item {
    margin-top: 44px;

    .van-button {
      background: @primary;
      border-color: @primary;
    }
  }
}
</style>