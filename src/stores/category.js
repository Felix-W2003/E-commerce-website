import {ref,computed} from 'vue'
import {defineStore} from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category',()=>{
    //属于导航列表的逻辑
    const categoryList = ref([])
    const getCategory = async ()=>{
        const res = await getCategoryAPI()
    
        categoryList.value = res.result
    }
    return {
        categoryList,
        getCategory
    }
})