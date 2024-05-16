export interface ICampaign {
    uid: string
    title: string
    spent: number
    daily_spent: number
    type: string
    is_enabled: number
    is_escapable: number
    link: string
    category: {
        id: number
        name: string
    }
    createdAt: string
    updatedAt: string
    cost_mode: number
    budget: number
    budget_daily: number
    start_time: string
    end_time: string
    contents?: {
        id: number
        uid: string
        format: string
        title: string
        file: string
        resource: string
        createdAt: string
        updatedAt: string
    }[]
}

export interface IPublishers {
    uid: string
    title: string
    domain: string
    createdAt: string
    updatedAt: string
}
