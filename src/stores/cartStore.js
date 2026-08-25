// 封装购物车相关的pinia state和action
import {defineStore} from 'pinia'
import {ref,computed} from 'vue'
import {useUserStore} from './userStore'
import {insertCartAPI,findNewCartListAPI,delCartAPI} from '@/apis/cart.js'
export const useCartStore = defineStore('cart',()=>{
    // 定义state
    const cartList = ref([])
    const userStore = useUserStore()
    const isLogin = computed(()=>userStore.userInfo.token)
    
    
    
    // 获取最新购物车列表
    const updateNewList =async ()=>{
       const res = await findNewCartListAPI()
       cartList.value = res.result
    }
    // action -- 添加addCart方法
    const addCart = async(goods)=>{
        if(isLogin.value){
            // console.log(isLogin,isLogin.value)
        const {skuId,count} = goods
            //登录后加入购物车逻辑
       await insertCartAPI({skuId,count})
       updateNewList()
      
        }else{
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
}

    const delCart = async(skuId)=>{

        if(isLogin.value){
            await delCartAPI([skuId])
            updateNewList()
        }
        else{
        // 思路1：找到要删除项的下标值 -- splice
        // 思路2：使用数组的过滤方法 -- filter
        const idx = cartList.value.findIndex((item)=>skuId === item.skuId)
        cartList.value.splice(idx,1)
        }

    




    }



    //计算属性
    //1.总数：所有count之和
    const allCount = computed(()=> cartList.value.reduce((a,c)=>a+c.count,0))

    //2.总价格:所有count*price之和

    const allPrice = computed(()=> cartList.value.reduce((a,c)=>a+c.count*c.price,0))


    //单选功能 
    const singleCheck = (skuId,selected)=>{
        // 通过skuId找到要修改的哪一项，修改selected
        const item = cartList.value.find((item)=> item.skuId === skuId)
        item.selected = selected
    }


    const isAll = computed(()=> cartList.value.every((item)=>item.selected))

    const allCheck = (selected)=>{
        cartList.value.forEach(item => 
            item.selected = selected
        );
    }


    const selectedCount = computed(()=>
        cartList.value.filter((item)=>item.selected).reduce((a,c)=>a+c.count,0)
    )

    const selectedPrice = computed(()=>
        cartList.value.filter((item)=>item.selected).reduce((a,c)=>a+c.count*c.price,0)
    )
    //清除购物车
    const clearCart = ()=> {
        cartList.value=[]
    }



    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
},{
    persist:true,
})