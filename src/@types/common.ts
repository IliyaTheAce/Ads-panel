import { CSSProperties, ReactNode } from 'react'

export interface CommonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}

export type SelectBoxType = {
    label: string
    value: number
}

export const CostMode: SelectBoxType[] = [
    { label: 'پخش یک چهارم', value: 1 },
    { label: 'پخش نیم', value: 2 },
    { label: 'پخش سه چهارم', value: 3 },
    { label: 'پخش کامل', value: 4 },
    { label: 'کلیک', value: 5 },
]
