import ApiService from '@/services/ApiService'

interface CommonDataResponse {
    result: boolean
    data: {
        categories: { id: number; name: string }[]
    }
}

export async function GetCommonData() {
    return ApiService.fetchData<CommonDataResponse>({
        url: '/common-data',
        method: 'get',
    })
}
