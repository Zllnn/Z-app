import axios from '../utils/axios'

export function addCart(params) {
  return axios.post('/shop-cart', params)
}

//获取购物车信息接口
export function getCart(params) {
  // return axios.get('/shop-cart', { params })
}