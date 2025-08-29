import axios from 'axios'
import { showFailToast } from 'vant'
// import router from '@/router'

// 环境变量获取
// eslint-disable-next-line no-console
console.log('import.meta.env', import.meta.env)

axios.defaults.baseURL = import.meta.env.MODE === 'development' ? '//backend-api-01.newbee.ltd/api/v1' : '//backend-api-01.newbee.ltd/api/v1'

axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    showFailToast('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) showFailToast(res.data.message)
    if (res.data.resultCode == 416) {
      // 未登录可按需处理
      // router.push({ path: '/login' })
    }
    if (res.data.data && window.location.hash == '#/login') {
      localStorage.setItem('token', res.data.data)
      axios.defaults.headers['token'] = res.data.data
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default axios


