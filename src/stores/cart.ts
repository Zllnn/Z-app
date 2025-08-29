import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCart } from '@/service/cart'

export const useCartStore = defineStore('cart', () => {
  const count = ref<number>(3)

  async function updateCart() {
    const { data = [] } = await getCart()
    count.value = (data as unknown[]).length
  }

  const address = ref<unknown | null>(null)
  const addressList = ref(
    [
      { id: 1, name: '张三', tel: '13800138000', address: '北京市东城区东华门街道王府井大街88号', isDefault: true },
      { id: 2, name: '李四', tel: '13800138001', address: '北京市东城区东华门街道王府井大街88号', isDefault: false },
      { id: 3, name: '王五', tel: '13800138002', address: '北京市东城区东华门街道王府井大街88号', isDefault: false }
    ]
  )

  return { count, updateCart, address, addressList }
})


