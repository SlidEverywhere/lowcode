import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@/':'./src/'
    }
  },
  define: {
    'process.env': {}
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    // cors: true, //默认启用并允许任何源
    https: false,
    // open: true, //在服务器启动时自动在浏览器中打开应用程序
    // 反向代理配置，注意rewrite写法
  },
  
})
