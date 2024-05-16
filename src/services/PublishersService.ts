import { SignInCredential, SignInResponse } from '@/@types/auth'
import ApiService from '@/services/ApiService'
import { ICampaign, IPublishers } from "@/@types/data";

interface PublishersListResponse {
    result: boolean
    data: {
        publishers: IPublishers[]
    }
}

export async function PublishersList(params: {
    keyword?: string
}) {
    return ApiService.fetchData<PublishersListResponse>({
        url: '/publishers',
        method: 'get',
        params,
    })
}

interface CampaignsDeleteResponse {
    result: boolean
}


export async function CampaignsDelete(id:string) {
    return ApiService.fetchData<PublishersListResponse>({
        url: `/campaigns/${id}`,
        method: 'delete',
    })
}
