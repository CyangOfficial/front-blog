// import { Message } from '@arco-design/web-vue'
import type { FetchResponse, SearchParameters } from 'ofetch'
import type { Ref } from 'vue'
import type { UseFetchOptions } from '#app'
// import { useUserStore } from '~/stores/user.store'
// import IconEmoticonDead from '~icons/mdi/emoticon-dead'

export interface ResData<T> {
  items: T[]
  [x: string]: any
}

export interface ResOptions<T> {
  result: T
  code: number
  message: string
}

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

export type HttpOption<T> = UseFetchOptions<ResOptions<ResData<T>>>

const handleError = <T>(response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>) => {
  const err = (text: string) => {
    // Message.error({
    //   content: response?._data?.message ?? text,
    //   icon: () => h(IconEmoticonDead),
    // })
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
    401: () => {
      err('登录状态已过期，需要重新登录')
      // userStore.clearUserInfo()
      // TODO 跳转实际登录页
      navigateTo('/')
    },
  }
  handleMap[response.status] ? handleMap[response.status]() : err('未知错误！')
}
// get方法传递数组形式参数
const paramsSerializer = (params?: SearchParameters) => {
  if (!params)
    return

  const query = useCloneDeep(params)
  Object.entries(query).forEach(([key, val]) => {
    if (typeof val === 'object' && Array.isArray(val) && val !== null) {
      query[`${key}[]`] = toRaw(val).map((v: any) => JSON.stringify(v))
      delete query[key]
    }
  })
  return query
}
const fetch = <T>(url: UrlType, option: UseFetchOptions<ResOptions<ResData<T>>> | any) => {
  const { public: { baseURL } } = useRuntimeConfig()
  return useFetch<ResOptions<ResData<T>>>(url, {
    // 请求拦截器
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
    // 响应拦截
    onResponse({ response }) {
      console.log('response', response._data)
      // if (response.status === 0)
      //   return response
      // 在这里判断错误
      if (response._data.code !== 0) {
        console.log('错误错误错误错误错误')
        // handleError<T>(response)
        // showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        throw createError({
          statusCode: response._data.statusCode,
          // statusMessage: baseURL + url,
          message: response?._data?.message || '服务器内部错误',
          fatal: true,
        })
        // return Promise.reject(response._data)
      }
      // 成功返回
      return response._data
    },
    // 错误处理
    onResponseError({ response }) {
      // handleError<T>(response)
      console.log('error response', response)
      // throw createError({
      //   statusCode: 500,
      //   statusMessage: baseURL + url,
      //   message: response?._data?.message || '服务器内部错误',
      //   fatal: true,
      // })
      return Promise.reject(response?._data ?? null)
    },
    // 合并参数
    ...option,
  })
}

// 自动导出
export const useHttp = {
  get: <T>(url: UrlType, params?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'get', params, ...option })
  },

  post: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'post', body, ...option })
  },

  put: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'put', body, ...option })
  },

  delete: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'delete', body, ...option })
  },
}
