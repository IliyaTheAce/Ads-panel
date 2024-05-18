import ApiService from '@/services/ApiService'
import { IPublishers } from '@/@types/data'

interface PublishersListResponse {
    result: boolean
    data: {
        publishers: IPublishers[]
    }
}

export async function PublishersList(params: { keyword?: string }) {
    return ApiService.fetchData<PublishersListResponse>({
        url: '/publishers',
        method: 'get',
        params,
    })
}

interface PublisherDeleteResponse {
    result: boolean
}

export async function PublisherDelete(id: string) {
    return ApiService.fetchData<PublisherDeleteResponse>({
        url: `/publishers/${id}`,
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

export async function ApiCreatePublisher(data: CreatePublisherRequest) {
    return ApiService.fetchData<CreatePublisherResponse>({
        url: '/publishers',
        method: 'post',
        data,
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

export async function GetPublisher(id: string) {
    return ApiService.fetchData<GetPublisherResponse>({
        url: `/publishers/${id}`,
        method: 'get',
    })
}
