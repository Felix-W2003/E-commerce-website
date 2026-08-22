import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router/index.js'
import '@/styles/common.scss'
// 定义懒加载插件
import {lazyPlugin} from '@/directives'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
