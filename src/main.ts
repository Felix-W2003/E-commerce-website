import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import {getCategory} from '@/apis/testApi.ts'

const app = createApp(App)
getCategory().then(res =>{
    console.log(res)
})
app.use(createPinia())

app.mount('#app')