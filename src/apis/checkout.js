//订单结算页面的接口
import httpInstance from "@/utils/http"

export const getCheckInfoAPI= ()=>{
    return httpInstance({
        url:'/member/order/pre'
    })
}

export const createOrderAPI=(data)=>{
    return httpInstance({
        url:'/member/order',
        method:'POST',
        data
    })
}