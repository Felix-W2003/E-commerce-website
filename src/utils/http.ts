import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import{useUserStore} from '@/stores/user.js'
import  router  from '@/router'
// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  //统一错误处理
  const userStore = useUserStore()
  ElMessage({
    type:'warning',
    message:e.response.data.message
  })


  // 401 token失效处理
  if(e.response.status === 401){
  // 1. 清除本地用户数据
 
  userStore.clearUserInfo()
  router.push('/login')
  // 2. 跳转到登录页
  }
  return Promise.reject(e)
})


export default httpInstance
