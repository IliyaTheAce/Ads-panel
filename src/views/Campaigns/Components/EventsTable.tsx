import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'

type EventType = {
    uid: string
    title: string
    resource: string
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
                accessorKey: 'id',
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
                header: 'تنظیمات',
                accessorKey: 'resource',
                enableSorting: false,
                cell: (props) => (
                    <div className="flex justify-end text-lg">
                        <a
                            target={'_blank'}
                            href={props.row.original.resource}
                            className={`cursor-pointer p-2 hover:${textTheme}`}
                        >
                            <HiOutlineEye />
                        </a>
                    </div>
                ),
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

export default EventsTable