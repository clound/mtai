/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 16:49:26
 * @LastEditTime: 2020-07-12 18:22:13
 */

import axios from 'axios'
import { message } from 'antd'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/mt' : 'http://127.0.0.1:3000', // api的base_url
  timeout: 1200000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if ('error' in res) {
      message.error(res.error.errors[0].message)
      return Promise.reject('error')
    } else {
      if (res.result && res.result.code === 300) {
        return false
      }
      return res
    }
  },
  (error) => {
    console.log(error.response) // for debug
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
