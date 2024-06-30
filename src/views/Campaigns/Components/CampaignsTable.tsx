import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useAppDispatch } from '@/store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { setSelectedId, toggleDeleteConfirmation } from '@/store/slices/app'
import appConfig from '@/configs/app.config'
import { ICampaign } from '@/@types/data'
import { useNavigate } from 'react-router-dom'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { Tag } from '@/components/ui'

const CampaignsTable = ({
    loading,
    data,
    onRefresh,
}: {
    data: ICampaign[]
    loading: boolean
    onRefresh: () => void
}) => {
    const { apiPrefix } = appConfig
    const tableRef = useRef<DataTableResetHandle>(null)
    const columns = useMemo<ColumnDef<ICampaign>[]>(
        () => [
            {
                header: '#',
                accessorKey: 'uid',
                enableSorting: false,
                cell: (props) => {
                    return props.row.index + 1
                },
            },
            {
                header: 'عنوان',
                accessorKey: 'title',
                enableSorting: false,
            },
            {
                header: 'تاریخ ثبت',
                accessorKey: 'createdAt',
                enableSorting: false,
                cell: ({ row }) => {
                    return row.original.createdAt
                        .split(' ')[0]
                        .replaceAll('-', '/')
                },
            },
            {
                header: 'دسته بندی',
                accessorKey: 'categories',
                enableSorting: false,
                cell: (props) => {
                    return props.row.original.categories.map(
                        (item) => item.name + ','
                    )
                },
            },
            {
                header: 'وضعیت تایید کمپین',
                accessorKey: 'approved',
                enableSorting: false,
                cell: ({ row }) => {
                    return row.original.approved === 1 ? (
                        <Tag prefix prefixClass="bg-emerald-500">
                            تایید شده
                        </Tag>
                    ) : (
                        <Tag prefix prefixClass="bg-yellow-500">
                            در انتظار تایید
                        </Tag>
                    )
                },
            },
            {
                header: 'وضعیت تایید محتوا',
                accessorKey: 'has_approved_content',
                enableSorting: false,
                cell: ({ row }) => {
                    return row.original.has_approved_content === 1 ? (
                        <Tag prefix prefixClass="bg-emerald-500">
                            تایید شده
                        </Tag>
                    ) : (
                        <Tag prefix prefixClass="bg-yellow-500">
                            در انتظار تایید
                        </Tag>
                    )
                },
            },
            {
                header: 'وضعیت',
                accessorKey: 'is_enabled',
                enableSorting: false,
                cell: (props) => {
                    return props.row.original.is_enabled === 1 ? (
                        <Tag prefix prefixClass="bg-emerald-500">
                            فعال{' '}
                        </Tag>
                    ) : (
                        <Tag prefix prefixClass="bg-rose-500">
                            غیر فعال{' '}
                        </Tag>
                    )
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

const ActionColumn = ({ row }: { row: ICampaign }) => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const { textTheme } = useThemeClass()

    const OnShow = () => {
        nav(`${APP_PREFIX_PATH}/campaigns/${row.uid}`)
    }
    const onEdit = () => {
        nav(`${APP_PREFIX_PATH}/campaigns/${row.uid}/edit`)
    }

    const onDelete = () => {
        dispatch(setSelectedId(row.uid))
        dispatch(toggleDeleteConfirmation(true))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={OnShow}
            >
                <HiOutlineEye />
            </span>
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

export default CampaignsTable
