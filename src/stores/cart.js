import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCart } from '@/service/cart'
export const useCartStore = defineStore('cart', () => {
  // 记录购物车数量的 count 变量
  const count = ref(3)
  // 更新购物车数量的 action 函数
  async function updateCart() {
    const { data = [] } = await getCart() // 获取购物车数量的接口
    count.value = data.length
  }
  //记录订单地址
  const address = ref(null)
  //地址列表
  const addressList = ref([
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
  ])
  return { count, updateCart, address, addressList }
})