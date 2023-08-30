// import { Message } from '@arco-design/web-vue'
// import { useToast } from 'vue-toast-notification'
// import * as Toast from 'vue-toastification'
import type { FetchResponse } from 'ofetch'
import type { Ref } from 'vue'
// import * as Toast from 'vue-toast-notification'
// import 'vue-toast-notification/dist/theme-bootstrap.css'
import type { UseFetchOptions } from '#app'

// const { useToast } = Toast
// const toast = useToast()
export interface ResData<T> {
  items: T
  [x: string]: any
}

export interface ResOptions<T> {
  data: T
  code: number
  message: string
}

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

export type HttpOption<T> = UseFetchOptions<ResOptions<ResData<T>>>
const handleError = <T>(response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>) => {
  const err = (text: string) => {
    // toast.error(text ?? response?._data?.message)
  }
  if (!response._data) {
    err('请求超时，服务器无响应！')
    return
  }
  // const userStore = useUserStore()
  const handleMap: { [key: number]: () => void } = {
    404: () => err('服务器资源不存在'),
    500: () => err('服务器内部错误'),
    403: () => err('没有权限访问该资源'),
    429: () => err('请求过于频繁'),
  }
  handleMap[response.status] ? handleMap[response.status]() : err('未知错误！')
}
// get方法传递数组形式参数
// const paramsSerializer = (params?: SearchParameters) => {
//   if (!params)
//     return

//   const query = useCloneDeep(params)
//   Object.entries(query).forEach(([key, val]) => {
//     if (typeof val === 'object' && Array.isArray(val) && val !== null) {
//       query[`${key}[]`] = toRaw(val).map((v: any) => JSON.stringify(v))
//       delete query[key]
//     }
//   })
//   return query
// }
// const errorTotal = 0
const fetch = <T>(url: UrlType, option: UseFetchOptions<ResOptions<ResData<T>>>) => {
  const { public: { baseURL } } = useRuntimeConfig()
  return useFetch(url, {
    onRequest({ options }) {
      // get方法传递数组形式参数
      // options.params = paramsSerializer(options.params)
      // 添加baseURL,nuxt3环境变量要从useRuntimeConfig里面取

      options.baseURL = baseURL
      // 添加请求头,没登录不携带token
      // const userStore = useUserStore()
      // if (!userStore.isLogin)
      //   return
      // options.headers = new Headers(options.headers)
      // options.headers.set('Authorization', `Bearer ${userStore.getToken}`)
    },
    onRequestError() {
      // process.client && toast.error('请求出错!')
    },
    // 响应拦截
    onResponse({ response }) {
      const resData = response._data
      // 成功返回
      return resData
    },
    // 错误处理
    onResponseError({ response }) {
      // console.log('onResponseError', { response })
      const resData = response._data
      process.client && handleError<T>(response)
      Promise.reject(resData)
    },
    // 合并参数
    ...option,
  })
}

// 自动导出
export const useHttp = {
  get: <T>(url: UrlType, params: any, option: HttpOption<T>) => {
    return fetch<T>(url, { method: 'get', params, ...option })
  },

  post: <T>(url: UrlType, body: any, option: HttpOption<T>) => {
    return fetch<T>(url, { method: 'post', body, ...option })
  },

  put: <T>(url: UrlType, body: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'put', body, ...option })
  },

  delete: <T>(url: UrlType, body: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'delete', body, ...option })
  },
}
