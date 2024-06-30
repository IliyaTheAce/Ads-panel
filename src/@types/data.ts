export interface ICampaign {
    uid: string
    title: string
    spent: number
    status?: number
    daily_spent: number
    type: string
    is_enabled: number
    is_escapable: number
    link: string
    approved: number
    has_approved_content: number
    approved_str: string
    categories: {
        id: number
        name: string
    }[]
    createdAt: string
    updatedAt: string
    cost_mode: number
    budget: number
    budget_daily: number
    start_time: string
    end_time: string
    contents: {
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
    costId: number
    createdAt: string
    updatedAt: string
    categories: { id: number; name: string }[]
}
export interface IContent {
    id: number
    uid: string
    format: string
    title: string
    file: string
    approved_str: string
    approved: number
    resource: string
}
export interface IUser {
    uid: string
    username: string
    firstname: string
    lastname: string
    email: string
    mobile: string
    role: string
}

export interface ITransaction {
    date: string
    time: string
    change: number
    balance: number
}

export interface IInvoice {
    uid: string
    title: string
    amount: number
    tax_amount: number
    total_amount: number
    status: number
    status_str: string
    trace_number: string
    ref_number: string
    createdAt: string
}
