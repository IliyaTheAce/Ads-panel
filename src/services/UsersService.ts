import { IUser } from '@/@types/data'
import ApiService from '@/services/ApiService'

interface GetUsersListResponse {
    result: boolean
    data: {
        users: IUser[]
    }
}
interface GetUserResponse {
    result: boolean
    data: {
        user: IUser
    }
}

export async function GetUsersList(params: { keyword?: string }) {
    return ApiService.fetchData<GetUsersListResponse>({
        url: '/users',
        method: 'get',
        params,
    })
}

export async function GetUser(id: string) {
    return ApiService.fetchData<GetUserResponse>({
        url: `/users/${id}`,
        method: 'get',
    })
}
export async function UpdateUser(
    id: string,
    data: {
        username: string
        firstname: string
        lastname: string
        email: string
        mobile: string
        password: string
    }
) {
    return ApiService.fetchData<GetUserResponse>({
        url: `/users/${id}`,
        method: 'post',
        data,
    })
}
