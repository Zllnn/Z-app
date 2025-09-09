import axios from 'axios'
import { showFailToast } from 'vant'
// import router from '@/router'

// 环境变量获取
// eslint-disable-next-line no-console
console.log('import.meta.env', import.meta.env)

// 修改为使用相对路径，这样请求会发送到当前运行的端口
axios.defaults.baseURL = import.meta.env.MODE === 'development' ? '' : ''

axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    showFailToast('服务端异常！')
    return Promise.reject(res)
  }
  
  // 调整响应拦截器以匹配我们的后端返回格式
  // 我们的后端返回格式: {code: 1, message: "success", data: {...}}
  if (res.data.code != 1) {
    if (res.data.message) showFailToast(res.data.message)
    if (res.data.code == 0) {
      // 登录失败等错误情况
      return Promise.reject(res.data)
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default axios


