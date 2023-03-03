type Options = {
    data: any,
    headers: {key: string, value: string},
    method: string,
    timeout: number
  };

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
}

function queryStringify(data: any) {
  return Object.entries(data).reduce((agg, [key, value]) => [...agg, `${key}=${value!.toString()}`], []).join('&')
}

export class HTTPTransport {
  get = (url: string, options: Options) => this.request(options.data
    ? `${url}?${queryStringify(options.data)}` : url, { ...options, method: METHODS.GET })

  post = (url: string, options: Options) => this.request(url, {
    ...options,
    method: METHODS.POST
  })

  put = (url: string, options: Options) => this.request(url, {
    ...options,
    method: METHODS.PUT
  })

  delete = (url:string, options: Options) => this.request(url, {
    ...options,
    method: METHODS.DELETE
  })

  request = (url: string, options: Options) => {
    const { method, data, headers } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      if (headers) {
        Object.entries(options.headers).forEach(
          ([headerName, headerValue]) => xhr.setRequestHeader(headerName, headerValue)
        )
      }

      xhr.timeout = options.timeout

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
