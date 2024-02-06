import { createApp } from 'vue'
import App from './App.vue'

import * as VueRouter from 'vue-router'
import routes from "./config/route.ts";
import Vant from 'vant'
import 'vant/lib/index.css'


//vue应用程序初始化 使用根组件App.vue初始化一个新的vue应用实例
const app = createApp(App);

//vant ui组件注册
app.use(Vant);


//创建了一个新的路由器实例，使用 hash 模式（createWebHashHistory）来处理 URL，
// 这意味着路由将基于哈希（如 http://example.com/#/team）
// 上面定义的 routes 数组被传递以配置路由路径
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router);

//将 Vue 应用程序挂载到具有 ID app 的 DOM 元素上
app.mount('#app');









