import ApiService from '@/services/ApiService'
import { IContent, IPublishers } from '@/@types/data'

interface ContentsListResponse {
    result: boolean
    data: {
        contents: IContent[]
    }
}

export async function GetContentsList(params: {
    category_id?: number
    approved?: number
}) {
    return ApiService.fetchData<ContentsListResponse>({
        url: '/contents',
        method: 'get',
        params,
    })
}

interface ContnetDeleteResponse {
    result: boolean
}

export async function ContentDelete(id: string) {
    return ApiService.fetchData<ContnetDeleteResponse>({
        url: `/contents/${id}`,
        method: 'delete',
    })
}

interface CreatePublisherResponse {
    message: string
    result: boolean
    data: { publisher: IPublishers }
}

type CreatePublisherRequest = {
    categories: number[]
    cost_id: number
    user_id: number
    domain: string
    title: string
}

interface CreateContentDataResponse {
    result: boolean
    data: {
        campaigns: {
            uid: string
            title: string
        }[]
    }
}
export async function GetContentCreateData() {
    return ApiService.fetchData<CreateContentDataResponse>({
        url: '/contents/create/data',
        method: 'get',
    })
}

export async function ApiEditPublisher(
    id: string,
    data: CreatePublisherRequest
) {
    return ApiService.fetchData<CreatePublisherResponse>({
        url: `/publishers/${id}`,
        method: 'put',
        data,
    })
}

interface GetPublisherResponse {
    result: boolean
    message: string
    data: {
        publisher: IPublishers
    }
}

export async function ApiCreateContent(data: FormData) {
    return ApiService.fetchData<GetPublisherResponse>({
        url: `/contents`,
        method: 'post',
        data,
    })
}
export async function ContentSetApproval(
    id: string,
    data: { approved: number }
) {
    return ApiService.fetchData<GetPublisherResponse>({
        url: `/contents/${id}`,
        method: 'put',
        data,
    })
}
