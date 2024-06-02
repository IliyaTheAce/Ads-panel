import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import useThemeClass from '@/utils/hooks/useThemeClass'

type EventType = {
    amount: number
    date: string
}
const EventsTable = ({
    loading,
    data,
}: {
    data: EventType[]
    loading: boolean
}) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const { textTheme } = useThemeClass()
    const columns = useMemo<ColumnDef<EventType>[]>(
        () => [
            {
                header: '#',
                accessorKey: 'amount',
                enableSorting: false,
                cell: (props) => {
                    return props.row.index + 1
                },
            },
            {
                header: 'مبلغ',
                accessorKey: 'amount',
                enableSorting: false,
            },
            {
                header: 'تاریخ',
                accessorKey: 'date',
                enableSorting: false,
            },
        ],
        []
    )

    return (
        <div className={'mt-10'}>
            <h4>رویداد ها</h4>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                showPageSizeSelectBox={false}
            />
        </div>
    )
}

export default EventsTable
