// 支付界面相关api
// 封装购物车相关接口
import httpInstance from "@/utils/http"

export const getOrderAPI = (id)=>{
    return httpInstance({
        url:`/member/order/${id}`,
        method:'GET'
    })
}