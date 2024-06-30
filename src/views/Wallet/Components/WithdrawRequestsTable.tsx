import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import { IWithdraw } from '@/@types/data'
import { Tag } from '@/components/ui'
import { toggleShowDialog, useAppDispatch } from '@/store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { HiOutlineEye } from 'react-icons/hi'

const WithdrawRequestsTable = ({
    loading,
    data,
}: {
    data: IWithdraw[]
    loading: boolean
}) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const columns = useMemo<ColumnDef<IWithdraw>[]>(
        () => [
            {
                header: 'ردیف',
                accessorKey: 'uid',
                enableSorting: false,
                cell: (props) => {
                    return props.row.index + 1
                },
            },
            {
                header: 'تاریخ',
                accessorKey: 'createdAt',
                enableSorting: false,
            },
            {
                header: 'مبلغ',
                accessorKey: 'amount',
                enableSorting: false,
            },
            {
                header: 'وضعیت تایید',
                accessorKey: 'status',
                enableSorting: false,
                cell: (props) => {
                    switch (props.row.original.status) {
                        case 0:
                            return (
                                <Tag prefix prefixClass="bg-yellow-500">
                                    در انتظار
                                </Tag>
                            )

                        case 1:
                            return (
                                <Tag prefix prefixClass="bg-emerald-500">
                                    تایید شده
                                </Tag>
                            )

                        case 2:
                            return (
                                <Tag prefix prefixClass="bg-rose-500">
                                    رد شده
                                </Tag>
                            )

                        default:
                            return 'Error'
                    }
                },
            },
            {
                header: 'تنظیمات',
                accessorKey: 'id',
                enableSorting: false,
                cell: (props) => <ActionColumn row={props.row.original} />,
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

const ActionColumn = ({ row }: { row: IWithdraw }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()

    const OnShow = () => {
        dispatch(toggleShowDialog(row.note))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme} ${
                    row.status !== 2 && 'hidden'
                }`}
                onClick={OnShow}
            >
                <HiOutlineEye />
            </span>
        </div>
    )
}

export default WithdrawRequestsTable
