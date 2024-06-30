import ApiService from '@/services/ApiService'
import { IWithdraw } from '@/@types/data'

interface WithdrawResponse {
    result: boolean
    data: {
        witdraws: IWithdraw[]
    }
}

export async function GetWithdrawRequests(params: { status: number }) {
    return ApiService.fetchData<WithdrawResponse>({
        url: '/withdrawls/management',
        method: 'get',
        params,
    })
}

export async function ApproveRequest(
    id: string,
    data: {
        bank_account: string
        ref_number: string
    }
) {
    return ApiService.fetchData<WithdrawResponse>({
        url: `/withdrawls/${id}/approve`,
        method: 'post',
        data,
    })
}
export async function DeclineRequest(
    id: string,
    data: {
        note: string
    }
) {
    return ApiService.fetchData<WithdrawResponse>({
        url: `/withdrawls/${id}/cancel`,
        method: 'post',
        data,
    })
}
