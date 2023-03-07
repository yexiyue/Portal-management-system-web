import axios from 'axios'

export type News={
    id:number
    title: string
    content: string
    category: number
    cover: string
    userId:number
    createTime:string
    isPublish:number
    updateTime:string
}

export const getNews=async ()=>{
    return (await axios.get('/news')).data
}

export const getNewsById=async (id:number)=>{
    return (await axios.get('/news/'+id)).data
}

export const getNewsLast=async (take:number)=>{
    return (await axios.get('/news/last?take='+take)).data
}