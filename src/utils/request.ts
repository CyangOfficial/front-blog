function fetch(url: string, options?: any): Promise<any> {
  const token = useCookie('token')
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const config = useRuntimeConfig()
  const reqUrl = config.public.baseURL + url
  // console.log('reqUrl', reqUrl)y
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options, headers }).then(({ data }: any) => {
      // console.log('data', data)
      const value = data.value
      if (data._rawValue?.code === 0) {
        resolve(data)
      }
      else if (!data._rawValue) {
        reject(value)
      }
      else if (data._rawValue.code !== 0) {
        // error msg toast
      }
    }).catch((err: any) => {
      reject(err)
    })
  })
}

export default new class Http {
  get(url: string, params: string | object): Promise<any> {
    return fetch(url, { methods: 'get', params })
  }

  post(url: string, params: string): Promise<any> {
    return fetch(url, { methods: 'post', params })
  }

  put(url: string, body: string): Promise<any> {
    return fetch(url, { methods: 'put', body })
  }

  delete(url: string, body: string): Promise<any> {
    return fetch(url, { methods: 'delete', body })
  }
}()
