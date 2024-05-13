   // src/http/index.js
   import axios from 'axios';

   const instance = axios.create({
    //  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000', // API基础URL
     timeout: 5000, // 请求超时时间
    //  headers: {'X-Custom-Header': 'foobar'}, // 可选的自定义headers
   });

   // 请求拦截器
   instance.interceptors.request.use(
     config => {
       // 比如在这里添加token
       const token = localStorage.getItem('token');
       if (token) {
         config.headers.Authorization = `${token}`;
       }
       return config;
     },
     error => {
       console.error('Request Error:', error);
       Promise.reject(error);
     }
   );

   // 响应拦截器
   instance.interceptors.response.use(
     response => response,
     error => {
       console.error('Response Error:', error);
      //  if (error.response.status === 401) {
      //    // 处理未授权情况
      //    window["$message"].error("账号或密码错误");
      //  }
      window["$message"].error(error.response.data.msg);
       return Promise.reject(error);
     }
   );

   export default instance;