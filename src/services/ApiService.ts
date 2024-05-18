import BaseService from './BaseService'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown> | FormData>(
        param: AxiosRequestConfig<Request>
    ) {
        return new Promise<AxiosResponse<Response>>((resolve, reject) => {
            BaseService(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
}

export default ApiService
