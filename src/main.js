import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router/index.js'
import '@/styles/common.scss'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 定义懒加载插件
import {lazyPlugin} from '@/directives'
import {componentPlugin} from '@/components'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')
