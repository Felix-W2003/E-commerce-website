import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router/index.ts'
import '@/styles/common.scss'
// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')


//定义全局指令

app.directive('img-lazy',{
    mounted(el,binding){
        //el:指定绑定的那个元素 img
        //binding:binding.value 指令等于号后面绑定的表达式的值 图片url
        console.log(el,binding.value)
        useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if (isIntersecting) {
             //代表图片进入视口区域
             el.src = binding.value
            }
          },
        )
    }
})
