import ApiService from '@/services/ApiService'
import { ITransaction } from '@/@types/data'

interface TransactionsResponse {
    result: boolean
    data: {
        transactions: ITransaction[]
    }
}

export async function GetTransactions() {
    return ApiService.fetchData<TransactionsResponse>({
        url: '/wallet/transactions',
        method: 'get',
    })
}

export async function WithdrawRequest() {
    return ApiService.fetchData<{ result: boolean }>({
        url: '/withdrawls/create',
        method: 'post',
    })
}
