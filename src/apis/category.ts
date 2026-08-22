import httpInstance from "@/utils/http"


export function getSecondCategoryAPI(id) {
    return httpInstance({
        url:"/category",
        params:{
            id
        }
    })
}