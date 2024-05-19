import { IUser } from '@/@types/data'
import ApiService from '@/services/ApiService'

interface GetProfileResponse {
    result: boolean
    data: {
        user: IUser
    }
}
interface UpdateProfileResponse {
    result: boolean
    meta: {
        user: IUser
    }
}

export async function UpdateProfile({
    data,
}: {
    data: {
        firstname: string
        lastname: string
        mobile: string
        email: string
        password: string
        password_confirmation: string
        username: string
    }
}) {
    return ApiService.fetchData<UpdateProfileResponse>({
        url: '/profile',
        method: 'post',
        data,
    })
}

export async function GetProfile() {
    return ApiService.fetchData<GetProfileResponse>({
        url: `/profile`,
        method: 'get',
    })
}
