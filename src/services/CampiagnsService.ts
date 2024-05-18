import ApiService from '@/services/ApiService'
import { ICampaign } from '@/@types/data'

interface CampaignsListResponse {
    result: boolean
    data: {
        campaigns: ICampaign[]
    }
}

export async function CampaignsList(params: {
    category_id?: number
    keyword?: string
}) {
    return ApiService.fetchData<CampaignsListResponse>({
        url: '/campaigns',
        method: 'get',
        params,
    })
}

interface GetCampaignResponse {
    result: boolean
    message: string
    data: {
        campaign: ICampaign
    }
}

export async function GetCampaign(id: string) {
    return ApiService.fetchData<GetCampaignResponse>({
        url: `/campaigns/${id}`,
        method: 'get',
    })
}

interface CampaignsDeleteResponse {
    result: boolean
}

export async function CampaignsDelete(id: string) {
    return ApiService.fetchData<CampaignsDeleteResponse>({
        url: `/campaigns/${id}`,
        method: 'delete',
    })
}

interface CreateCampaignResponse {
    message: string
    result: boolean
    data: { campaign: ICampaign }
}

type CreateCampaignRequest = {
    categoryId: number
    title: string
    type: string
    budget: number
    budget_daily: number
    start_time: string
    end_time: string
    is_enabled: number
    is_escapable: number
    cost_mode: number
    link: string
}

export async function ApiCreateCampaign(data: CreateCampaignRequest) {
    return ApiService.fetchData<CreateCampaignResponse>({
        url: '/campaigns',
        method: 'post',
        data,
    })
}

export async function ApiEditCampaign(id: string, data: CreateCampaignRequest) {
    return ApiService.fetchData<CreateCampaignResponse>({
        url: `/campaigns/${id}`,
        method: 'put',
        data,
    })
}
