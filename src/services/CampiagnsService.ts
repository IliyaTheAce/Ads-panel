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
    approved?: number
    expired?: string
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

export async function GetCampaign(id: string | undefined) {
    return ApiService.fetchData<GetCampaignResponse>({
        url: `/campaigns/${id}`,
        method: 'get',
    })
}
interface GetCampaignEventsResponse {
    result: boolean
    message: string

    data: {
        chart: {
            series: {
                name: string
                data: number[]
            }[]
            categories: string[]
        }
        days: { amount: number; date: string }[]
    }
}
export async function GetCampaignEvents(id: string | undefined) {
    return ApiService.fetchData<GetCampaignEventsResponse>({
        url: `/campaigns/${id}/events`,
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
    categories: number[]
    title: string
    type: string
    budget: number
    budget_daily: number
    start_time: string
    end_time: string
    is_enabled: number
    is_escapable: number
    cost_mode: number
    approved?: number
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

interface InvoicePreviewResponse {
    result: boolean
    data: {
        campaign: {
            uid: string
            title: string
            amount_wallet: number
            amount: number
            tax_amount: number
            total_amount: number
            start_time: string
            end_time: string
        }
    }
}

interface InvoiceStoreResponse {
    result: boolean
    data: {
        needPay: boolean
        invoice: {
            uid: string
            title: string
            amount: number
            tax_amount: number
            wallet_amount: number
            total_amount: number
            url: string
        }
    }
}

export async function ApiInvoicePreview(id: string) {
    return ApiService.fetchData<InvoicePreviewResponse>({
        url: `/campaigns/${id}/invoice/preview`,
        method: 'get',
    })
}
export async function ApiInvoiceStore(id: string, from_wallet: boolean) {
    return ApiService.fetchData<InvoiceStoreResponse>({
        url: `/campaigns/${id}/invoice/store`,
        method: 'post',
        data: {
            from_wallet,
        },
    })
}
