import { createApp } from 'vue'
import router from '@/router'
import './style.css'
import App from './App.vue'
import { Button, Form, Field, Toast, Icon, Swipe, SwipeCell, SwipeItem } from 'vant'
import 'lib-flexible/flexible'
import '@/common/style/theme.css'
import 'vant/es/toast/style'

//初始化vue实例
const app = createApp(App)
//注册路由
app.use(router)
//注册组件
app.use(Form).use(Field).use(Toast).use(Button).use(Icon).use(Swipe).use(SwipeCell).use(SwipeItem)

//规范图片路径
app.config.globalProperties.$filters = {
  prefix(url) {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `xxx${url}`
      return url
    }
  }
}
//挂载vue实例
app.mount('#app')
