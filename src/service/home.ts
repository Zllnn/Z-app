import axios from '@/utils/axios'

export function getHome(params?: Record<string, unknown>) {
  return axios.get('/index-infos', { params })
}


