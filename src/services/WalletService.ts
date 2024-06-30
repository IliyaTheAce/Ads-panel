import ApiService from '@/services/ApiService'
import { IInvoice, ITransaction } from '@/@types/data'

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
