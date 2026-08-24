// 封装购物车相关的pinia state和action
import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useCartStore = defineStore('cart',()=>{
    // 定义state
     const cartList = ref([])
     

    // action -- 添加addCart方法
    const addCart = (goods)=>{
        //添加购物车操作
        //已添加过，count+1

        //没有添加过，直接push
        const item = cartList.value.find((item)=> goods.skuId ===item.skuId)
        if(item){
            //找到了
            item.count++
        }else{

            // 没找到
            cartList.value.push(goods)
        }
    }

    const delCart = (skuId)=>{
        // 思路1：找到要删除项的下标值 -- splice
        
        // 思路2：使用数组的过滤方法 -- filter
        const idx = cartList.value.findIndex((item)=>skuId === item.skuId)
        cartList.value.splice(idx,1)

    }

    return {
        cartList,
        addCart,
        delCart
    }
},{
    persist:true,
})