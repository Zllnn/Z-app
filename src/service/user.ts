import axios from '@/utils/axios'

export function getUserInfo() {
  return axios.get('/user/info')
}

export function login(params: { loginName: string; passwordMd5: string }) {
  return axios.post('/user/login', params)
}

export function logout() {
  return axios.post('/user/logout')
}

export function register(params: { loginName: string; password: string }) {
  return axios.post('/user/register', params)
}

export function EditUserInfo(params: Record<string, unknown>) {
  return axios.put('/user/info', params)
}


