import { IUser } from '@/@types/data'
import ApiService from '@/services/ApiService'

interface GetProfileResponse {
    result: boolean
    data: {
        user: IUser
        bank: {
            bank_name: string
            card_number: string
            shaba: string
        }
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
        bank_name: string
        card_number: string
        shaba: string
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
