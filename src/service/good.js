import axios from '../utils/axios'

export function getCategory() {
  return axios.get('/categories')
}

export function search(params) {
  return axios.get('/search', { params });
}

//获取商品详情
export function getDetail(id) {
  return axios.get(`/goods/detail/${id}`)
}