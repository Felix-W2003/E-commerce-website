// 收货地址相关的api接口实现
import httpInstance from "@/utils/http"

export const getAddressAPI = ( )=>{
    return httpInstance({
        url:'/member/address'
    })
}


export const addAddressAPI = (data)=>{
    return httpInstance({
        url:'/member/address',
        method:'POST',
        data
    })
}

export const delAddressAPI = (id)=>{
    return httpInstance({
        url:`/member/address/${id}`,
        method:'DELETE'
    })
}