import axios from '@/utils/axios'

export function addCart(params: Record<string, unknown>) {
  return axios.post('/shop-cart', params)
}

export function getCart(params?: Record<string, unknown>) {
  return axios.get('/shop-cart', { params })
}

export function deleteCartItem(id: string | number) {
  return axios.delete(`/shop-cart/${id}`)
}

export function modifyCart(params: Record<string, unknown>) {
  return axios.put('/shop-cart', params)
}

export function getByCartItemIds(params: Record<string, unknown>) {
  return axios.get('/shop-cart/settle', { params })
}


