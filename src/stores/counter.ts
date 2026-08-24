import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore =  defineStore('counter',()=>{
    //定义数据
    const count = ref(0)
    const API_URL = 'https://www.baidu.com'
    //定义修改数据的方法（action 同步+异步）
    const increment = ()=>{
        count.value++
    }

    //getter 定义
    const doubleCount = computed(()=>count.value*2)

 
    //定义异步action
    const list = ref([])
    const getList =async()=>{
       const res =  await axios.get(API_URL)
    }
    //已对像的方式return供组价使用
    return{
        count,
        increment,
        doubleCount,
        list,
        getList
    }
})