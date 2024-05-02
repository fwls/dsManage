// 引入文件
import axios from 'axios'

// 基础配置
let service = axios.create({
    // baseURL: baseUrl, // url = base api url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

let loading;
// 请求拦截
service.interceptors.request.use(config => {

    //config.headers['Authorization'] = sessionStorage.getItem('token')
    return config
},error =>{
    console.log(error);
    return Promise.reject(error)
})


// 响应拦截
service.interceptors.response.use(res =>{

    return Promise.resolve(res)
},error =>{

    console.log('err'+error);
    return Promise.reject(error)
})

// 抛出
export default service