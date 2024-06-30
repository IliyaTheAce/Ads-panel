import ApiService from '@/services/ApiService'
import { IInvoice, ITransaction, IWithdraw } from '@/@types/data'

interface TransactionsResponse {
    result: boolean
    meta: {
        user: {
            wallet: number
        }
    }
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

interface InvoiceListResponse {
    result: boolean
    data: {
        invoices: IInvoice[]
    }
}

export async function GetInvoiceList() {
    return ApiService.fetchData<InvoiceListResponse>({
        url: '/invoices',
        method: 'get',
    })
}

interface WithdrawResponse {
    result: boolean
    data: {
        witdraws: IWithdraw[]
    }
}

export async function GetWithdrawRequestsList() {
    return ApiService.fetchData<WithdrawResponse>({
        url: '/withdrawls/list',
        method: 'get',
    })
}
