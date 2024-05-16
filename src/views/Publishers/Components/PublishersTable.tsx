import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { toggleViewSideBar, useAppDispatch } from '@/store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import {
    setSelectedId,
    toggleDeleteConfirmation,
    toggleEditSideBar,
} from '@/store/slices/app'
import { IPublishers } from '@/@types/data'

const PublishersTable = ({
    loading,
    data,
}: {
    data: IPublishers[]
    loading: boolean
    onRefresh: () => void
}) => {
    const CheckHttp = (url: string) => {
        if (url.includes('http')) {
            return url
        } else {
            return 'http://' + url
        }
    }
    const tableRef = useRef<DataTableResetHandle>(null)
    const columns = useMemo<ColumnDef<IPublishers>[]>(
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
                header: 'عنوان',
                accessorKey: 'title',
                enableSorting: false,
            },
            {
                header: 'دامنه',
                accessorKey: 'domain',
                enableSorting: false,
                cell: ({ row: { original } }) => {
                    const url = CheckHttp(original.domain)
                    return (
                        <a target={'_blank'} href={url}>
                            {url}
                        </a>
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

const ActionColumn = ({ row }: { row: IPublishers }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()

    const OnShow = () => {
        dispatch(setSelectedId(row.uid))
        dispatch(toggleViewSideBar(true))
    }
    const onEdit = () => {
        dispatch(setSelectedId(row.uid))
        dispatch(toggleEditSideBar(true))
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

export default PublishersTable
