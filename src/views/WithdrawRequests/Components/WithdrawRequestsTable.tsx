import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import {
    toggleApproveConfirmation,
    toggleDeclineConfirmation,
    toggleShowDialog,
    useAppDispatch,
} from '@/store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { setSelectedId } from '@/store/slices/app'
import { IWithdraw } from '@/@types/data'
import { Tag } from '@/components/ui'
import { BiCheck, CgClose } from 'react-icons/all'
import { HiOutlineEye } from 'react-icons/hi'

const WithdrawRequestsTable = ({
    loading,
    data,
}: {
    data: IWithdraw[]
    loading: boolean
    onRefresh: () => void
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
                header: 'نام و نام خانوادگی',
                accessorKey: 'user',
                enableSorting: false,
                cell: (props) => {
                    const row = props.row.original
                    return `${row.user.firstname} ${row.user.lastname}`
                },
            },
            {
                header: 'موبایل',
                accessorKey: 'user.mobile',
                enableSorting: false,
                cell: (props) => {
                    const row = props.row.original
                    return `${row.user.mobile}`
                },
            },
            {
                header: 'مبلغ',
                accessorKey: 'amount',
                enableSorting: false,
            },
            {
                header: 'تاریخ',
                accessorKey: 'createdAt',
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
        dispatch(
            toggleShowDialog(
                <div className={'flex flex-col gap-2 w-full'}>
                    <div className={' inline-flex gap-1'}>
                        شماره کارت: {row.user.bank_card}
                    </div>
                    <div className={' inline-flex gap-1'}>
                        نام بانک: {row.user.bank_name}
                    </div>
                    <div className={' inline-flex gap-1'}>
                        شماره شبا: {row.user.bank_sheba}
                    </div>
                </div>
            )
        )
    }
    const OnAccept = () => {
        dispatch(setSelectedId(row.uid))
        dispatch(toggleApproveConfirmation(true))
    }

    const OnDecline = () => {
        dispatch(setSelectedId(row.uid))
        dispatch(toggleDeclineConfirmation(true))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={OnShow}
            >
                <HiOutlineEye />
            </span>{' '}
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={OnAccept}
            >
                <BiCheck />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={OnDecline}
            >
                <CgClose />
            </span>
        </div>
    )
}

export default WithdrawRequestsTable
