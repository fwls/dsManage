// src/utils/axiosInstance.js
import axios from 'axios';

// 创建axios实例
const request  = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // 其他默认请求头...
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加token
    // if (store.getters.token) {
    //   config.headers.Authorization = `Bearer ${store.getters.token}`;
    // }
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 根据后端返回的状态码进行处理，这里只是一个示例
    if (res.code !== 200) {
      window['$message'].error(res.msg || 'Error');
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    console.log('err' + error); // for debug
    window['$message'].error(error.msg);
    return Promise.reject(error);
  }
);

export default request;