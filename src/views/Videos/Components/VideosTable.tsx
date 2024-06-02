import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import { useAppDispatch } from '@/store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { setSelectedId, toggleDeleteConfirmation } from '@/store/slices/app'
import { IContent } from '@/@types/data'

const VideosTable = ({
    loading,
    data,
}: {
    data: IContent[]
    loading: boolean
    onRefresh: () => void
}) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const columns = useMemo<ColumnDef<IContent>[]>(
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
                header: 'فرمت فایل',
                accessorKey: 'format',
                enableSorting: false,
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

const ActionColumn = ({ row }: { row: IContent }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()

    const onDelete = () => {
        dispatch(setSelectedId(row.uid))
        dispatch(toggleDeleteConfirmation(true))
    }

    return (
        <div className="flex justify-end text-lg">
            <a
                className={`cursor-pointer p-2 hover:${textTheme}`}
                href={row.resource}
                target={'_blank'}
            >
                <HiOutlineEye />
            </a>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

export default VideosTable
