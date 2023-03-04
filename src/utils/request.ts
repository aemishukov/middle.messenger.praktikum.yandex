type Options = {
  data?: any,
  headers?: {key: string, value: string},
  method?: string,
  timeout?: number
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
}

const defaultTimeout = 5 * 1000 // 5 sec

function queryStringify(data: any) {
  return Object.entries(data).reduce((agg, [key, value]) => [...agg, `${key}=${value!.toString()}`], []).join('&')
}

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => this.request(options.data
    ? `${url}?${queryStringify(options.data)}` : url, { ...options, method: METHODS.GET })

  post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST })

  put: HTTPMethod = (url, options = {}) => this.request(url, {
    ...options,
    method: METHODS.PUT
  })

  delete: HTTPMethod = (url, options = {}) => this.request(url, {
    ...options,
    method: METHODS.DELETE
  })

  request: HTTPMethod = (url, options = {}) => {
    const {
      method, data, headers, timeout = defaultTimeout
    } = options

    if (!method) throw new Error('request method is undefined')

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      if (headers) {
        Object.entries(headers).forEach(
          ([headerName, headerValue]) => xhr.setRequestHeader(headerName, headerValue)
        )
      }

      xhr.timeout = timeout

      xhr.onload = () => resolve(xhr)
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
