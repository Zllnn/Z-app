管理端链接：https://github.com/Zllnn/Z-admin

# Vue3 + TypeScript + Vite + Pinia + SCSS



## 项目概述

#### 1. 响应式状态管理
通过 Pinia 管理全局状态，包括购物车数据、用户信息、地址管理等。
#### 2. 路由系统与页面缓存
采用 Vue Router 实现单页应用路由管理，支持懒加载和页面缓存。
- 基于路由元信息(meta)的页面缓存策略
- 导航栏根据路由动态显示/隐藏
- 路由守卫处理页面访问权限

#### 3. 组件化架构
采用组件化开发模式，实现可复用、高内聚的UI组件。
- 通用组件：SimpleHeader、NavBar、Swiper等 
- 页面组件：Home、Cart、ProductDetail等

#### 5. 样式系统
采用SCSS预处理器和移动端优先的响应式设计。
- CSS变量管理主题色彩
- 移动端适配和触摸交互优化(lib-flexible + postcss-pxtorem)



