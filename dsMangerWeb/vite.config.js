import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools()
  ],
  server: {
    proxy: {
      '/api': {  
        target: 'http://localhost:3000', // 你的后端 API 地址  
        changeOrigin: true, // 如果你的 API 地址不是本地地址，需要设置为 true  
        // rewrite: (path) => path.replace(/^\/api/, '') // 替换请求路径中的 '/api'  
      }, 
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
