import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import { IInvoice } from '@/@types/data'
import { Tag } from '@/components/ui'

const TransactionsTable = ({
    loading,
    data,
    onRefresh,
}: {
    data: IInvoice[]
    loading: boolean
    onRefresh: () => void
}) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const columns = useMemo<ColumnDef<IInvoice>[]>(
        () => [
            {
                header: 'تاریخ و زمان',
                accessorKey: 'createdAt',
                enableSorting: false,
            },
            {
                header: 'عنوان',
                accessorKey: 'title',
                enableSorting: false,
            },
            {
                header: 'مبلغ',
                accessorKey: 'total_amount',
                enableSorting: false,
            },
            {
                header: 'وضعیت',
                accessorKey: 'status',
                enableSorting: false,
                cell: (props) => {
                    return props.row.original.status === 1 ? (
                        <Tag prefix prefixClass="bg-emerald-500">
                            پرداخت شده{' '}
                        </Tag>
                    ) : (
                        <Tag prefix prefixClass="bg-rose-500">
                            پرداخت نشده
                        </Tag>
                    )
                },
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
