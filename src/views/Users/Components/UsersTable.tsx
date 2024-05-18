import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import { toggleViewSideBar, useAppDispatch } from '@/store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { setSelectedId, toggleDeleteConfirmation } from '@/store/slices/app'
import { IUser } from '@/@types/data'
import { useNavigate } from 'react-router-dom'

const UsersTable = ({
    loading,
    data,
}: {
    data: IUser[]
    loading: boolean
    onRefresh: () => void
}) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const columns = useMemo<ColumnDef<IUser>[]>(
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
                header: 'نام',
                accessorKey: 'firstname',
                enableSorting: false,
                cell: ({ row }) => {
                    return row.original.firstname + ' ' + row.original.lastname
                },
            },
            {
                header: 'نام کاربری',
                accessorKey: 'username',
                enableSorting: false,
            },
            {
                header: 'موبایل',
                accessorKey: 'mobile',
                enableSorting: false,
            },
            {
                header: 'ایمیل',
                accessorKey: 'email',
                enableSorting: false,
            },
            // {
            //     header: 'تنظیمات',
            //     accessorKey: 'id',
            //     enableSorting: false,
            //     cell: (props) => <ActionColumn row={props.row.original} />,
            // },
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

const ActionColumn = ({ row }: { row: IUser }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const nav = useNavigate()
    const OnShow = () => {
        dispatch(setSelectedId(row.uid))
        dispatch(toggleViewSideBar(true))
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
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

export default UsersTable
