import axios from '../utils/axios'

export function addCart(params) {
  return axios.post('/shop-cart', params)
}

//获取购物车信息接口
export function getCart(params) {
  // return axios.get('/shop-cart', { params })
}

export function deleteCartItem(id) {
  return axios.delete(`/shop-cart/${id}`)
}

export function modifyCart(params) {
  // return axios.put('/shop-cart', params)
}