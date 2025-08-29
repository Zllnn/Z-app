import { createApp } from 'vue'
import router from '@/router'
import './style.css'
import App from './App.vue'
import { Button, Form, Field, Toast, Icon, Swipe, SwipeCell, SwipeItem, PullRefresh, List, Tab, Tabs, CheckboxGroup, Checkbox, SubmitBar, Stepper, Popup, AddressList, AddressEdit, Card } from 'vant'
import 'lib-flexible/flexible'
import '@/common/style/theme.css'
import 'vant/es/toast/style'
import { createPinia } from 'pinia'

// 初始化vue实例
const app = createApp(App)
// 注册路由
app.use(router)
// 注册组件
app.use(Form).use(Field).use(Toast).use(Button).use(Icon).use(Swipe).use(SwipeCell).use(SwipeItem).use(PullRefresh).use(List).use(Tab).use(Tabs).use(CheckboxGroup).use(Checkbox).use(SubmitBar).use(Stepper).use(Popup).use(AddressList).use(AddressEdit).use(Card)
// 添加全局状态管理pinia
app.use(createPinia())
// 规范图片路径
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(app.config.globalProperties as any).$filters = {
  prefix(url: string) {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `xxx${url}`
      return url
    }
  }
}
// 挂载vue实例
app.mount('#app')


