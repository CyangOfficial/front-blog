import { hash } from 'ohash'
import type { UseFetchOptions } from '#app'

// 可以把返回数据data里面可能含有的类型列出来
export interface ResData<T> {
  items: T[]
  [x: string]: any
}

// 后端返回的数据类型
export interface ResOptions<T> {
  result: T
  code?: number
  message?: string
}

export type HttpOption<T> = UseFetchOptions<ResOptions<ResData<T>>>

// type DataOption = AsyncData<any, any> & ResOptions<ResData<any>>

/**
 * api请求封装
 * @param { String } url 请求地址
 * @param { Object } options useFtech第二个参数
 * @param { Object } headers 自定义header头, 单独设置headers区分请求参数，也好设置类型
 */
async function fetch(url: string, options?: any, headers?: any) {
  try {
    const config = useRuntimeConfig()
    const reqUrl = config.public.baseURL + url

    // 设置key
    const key = hash(options + url)
    console.log('key', key)

    // 可以设置默认headers例如
    const customHeaders = { token: useCookie('token').value, ...headers }
    // console.log('options', options)
    const { data, pending, error, refresh } = await useFetch(reqUrl, { ...options, headers: customHeaders })
    const result = data.value as ResOptions<ResData<any>>
    // console.log('result: ', result)
    // console.log('error value:', error.value)
    if (error.value || !result || (result && result.code !== 0)) {
      console.log('throw error')
      throw createError({
        statusCode: 500,
        statusMessage: reqUrl,
        message: error.value?.data?.message || '服务器内部错误',
        fatal: true,
      })
    }
    return { data, pending, error, refresh }
  }
  catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

export default new class Http {
  get<T>(url: string, params?: any, options?: HttpOption<T>, headers?: any) {
    return fetch(url, { method: 'get', params, ...options }, headers)
  }

  post(url: string, body?: any, options?: object, headers?: any) {
    return fetch(url, { method: 'post', body, ...options }, headers)
  }

  put(url: string, body?: any, options?: object, headers?: any) {
    return fetch(url, { method: 'put', body, ...options }, headers)
  }

  delete(url: string, body?: any, options?: object, headers?: any) {
    return fetch(url, { method: 'delete', body, ...options }, headers)
  }
}()
