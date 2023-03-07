import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
axios.defaults.baseURL='/webapi'

axios.interceptors.response.use((response)=>{
    return response
},(error:AxiosError)=>{
    //错误信息报错
    ElMessage.error((error.response!.data as any).message)
})