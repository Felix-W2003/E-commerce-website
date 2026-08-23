// 封装分类相关代码
import {getSecondCategoryAPI} from '@/apis/category'
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';


export function useCategory( ){
    const secondCategoryList = ref({})
    const route = useRoute()
    const getSecondCategory = async (id = route.params.id)=>{
    const res = await getSecondCategoryAPI(id)
    secondCategoryList.value = res.result
}

onMounted(()=>getSecondCategory())
//目标：路由参数变化的时候，可以把分类数据接口重新发送
onBeforeRouteUpdate((to)=>{
    console.log('route has changed')

    //问题：使用最新的路由参数请求最新的参数

    console.log(to)
    getSecondCategory(to.params.id)
})

 return {
    secondCategoryList
 }

}