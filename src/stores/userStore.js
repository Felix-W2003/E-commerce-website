//管理用户相关数据
import {defineStore} from 'pinia'
import {loginAPI} from '@/apis/user.js'
import { useCartStore } from './cartStore'
import {ref} from 'vue'
import {mergeCartAPI} from '@/apis/cart.js'
export const useUserStore = defineStore('user',()=>{
    //定义管理用户数据的state
    const userInfo = ref({})

    const cartStore = useCartStore()
    //退出时清楚用户登录信息
    const clearUserInfo = ()=>{
        userInfo.value  = {}
        cartStore.clearCart()
    }
    //定义获取接口数据的action函数
    const getUserInfo = async({account, password})=>{
        const res= await loginAPI({account, password})
        userInfo.value = res.result
       await mergeCartAPI(cartStore.cartList.map(item=>{
            return {
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }))
        cartStore.updateNewList()
    }
    //以对象的格式把state和action return出去

    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist: true,
})