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
    { label: 'بازدید', value: 2 },
    { label: 'کلیک', value: 1 },
]

export const ApprovedModes: SelectBoxType[] = [
    {
        label: 'همه',
        value: -1,
    },
    {
        label: 'تایید نشده',
        value: 0,
    },
    {
        label: 'تایید شده',
        value: 1,
    },
]
