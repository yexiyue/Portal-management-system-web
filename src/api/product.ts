import axios from 'axios'

export type Product={
    id:number
    title:string
    description:string
    detail:string
    updateTime:string
    cover:string
}

export const getProduct=async ()=>{
    return (await axios.get('/product')).data
}
