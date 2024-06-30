import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import { ITransaction } from '@/@types/data'

const TransactionsTable = ({
    loading,
    data,
    onRefresh,
}: {
    data: ITransaction[]
    loading: boolean
    onRefresh: () => void
}) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const columns = useMemo<ColumnDef<ITransaction>[]>(
        () => [
            {
                header: 'تاریخ',
                accessorKey: 'date',
                enableSorting: false,
            },
            {
                header: 'زمان',
                accessorKey: 'time',
                enableSorting: false,
            },
            {
                header: 'تعیرات',
                accessorKey: 'change',
                enableSorting: false,
            },
            {
                header: 'موجودی',
                accessorKey: 'balance',
                enableSorting: false,
            },
        ],
        []
    )

    return (
        <div>
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

export default TransactionsTable
