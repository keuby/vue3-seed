import { App } from '@vue/runtime-core'
import { useTokenStore } from '@/store'
import axios, { AxiosAdapter, AxiosInstance, AxiosRequestConfig } from 'axios'

let request: AxiosInstance = null

export function useAxios(): AxiosInstance {
  if (request == null) {
    console.warn(
      'useAxios was called with no active Axios. Did you forget to install axios?'
    )
  }
  return request
}

export default {
  install(app: App): void {
    const authorizationAdapter = (adapter: AxiosAdapter) => {
      const token = useTokenStore()
      return (config: AxiosRequestConfig) => {
        config.headers.Authorization = 'Bearer ' + token.token
        return adapter(config)
      }
    }
    request = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL as string,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000,
      adapter: authorizationAdapter(axios.defaults.adapter)
    })

    request.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (!error.response) {
          return Promise.reject(error)
        }
        const response = error.response
        const code = response.status
        const data = response.data

        if (!response.config.skipHandle) {
          if (code === 400) {
            // TODO: 参数错误
          } else if (code === 401) {
            // TODO: 用户未授权
          } else if (code === 403) {
            // TODO: 用户权限不足
          } else if (code === 404) {
            // TODO: 请求没有找到资源
          } else if (code === 500) {
            // TODO: 服务器内部错误
          }
        }
        return Promise.reject(data)
      }
    )
    app.config.globalProperties.$axios = request
  }
}
