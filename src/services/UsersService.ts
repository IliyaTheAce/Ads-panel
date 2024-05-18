import { IUser } from '@/@types/data'
import ApiService from '@/services/ApiService'

interface GetUsersListResponse {
    result: boolean
    data: {
        users: IUser[]
    }
}

export async function GetUsersList(params: { keyword?: string }) {
    return ApiService.fetchData<GetUsersListResponse>({
        url: '/users',
        method: 'get',
        params,
    })
}
