import axios from '@/utils/axios'

export function createOrder(params: Record<string, unknown>) {
  return axios.post('/saveOrder', params)
}

export function getOrderList(params?: Record<string, unknown>) {
  return axios.get('/order', { params })
}

export function getOrderDetail(id: string | number) {
  return axios.get(`/order/${id}`)
}

export function cancelOrder(id: string | number) {
  return axios.put(`/order/${id}/cancel`)
}

export function confirmOrder(id: string | number) {
  return axios.put(`/order/${id}/finish`)
}

export function payOrder(params: Record<string, unknown>) {
  return axios.get('/paySuccess', { params })
}


