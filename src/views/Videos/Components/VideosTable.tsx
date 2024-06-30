import { useMemo, useRef } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '@/store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { setSelectedId, toggleDeleteConfirmation } from '@/store/slices/app'
import { IContent } from '@/@types/data'
import { Tag, Tooltip } from '@/components/ui'
import useAuthority from '@/utils/hooks/useAuthority'
import { BiCheck, MdClose } from 'react-icons/all'
import { ContentSetApproval } from '@/services/ContentsService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

const VideosTable = ({
    loading,
    data,
    onRefresh,
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
                header: 'وضعیت تایید',
                accessorKey: 'approved',
                enableSorting: false,
                cell: (props) => {
                    return props.row.original.approved === 1 ? (
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
                header: 'تنظیمات',
                accessorKey: 'id',
                enableSorting: false,
                cell: (props) => (
                    <ActionColumn
                        row={props.row.original}
                        onSuccess={onRefresh}
                    />
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

const ActionColumn = ({
    row,
    onSuccess,
}: {
    row: IContent
    onSuccess: () => void
}) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const { authority } = useAppSelector((state) => state.auth.user)

    const hasAuthority = useAuthority(authority, ['admin'])

    const onDelete = () => {
        dispatch(setSelectedId(row.uid))
        dispatch(toggleDeleteConfirmation(true))
    }

    const OnSetApproval = () => {
        ContentSetApproval(row.uid, {
            approved: row.approved === 1 ? 0 : 1,
        }).then((res) => {
            if (res.data.result) {
                onSuccess()
                toast.push(
                    <Notification
                        title={'عملیات موفق'}
                        type="success"
                        duration={2500}
                    ></Notification>,
                    {
                        placement: 'top-end',
                    }
                )
            }
        })
    }

    return (
        <div className="flex justify-end text-lg">
            {hasAuthority && row.approved === 1 ? (
                <Tooltip title={'عدم تایید'}>
                    <span
                        className="cursor-pointer p-2 hover:text-red-500"
                        onClick={OnSetApproval}
                    >
                        <MdClose />
                    </span>
                </Tooltip>
            ) : (
                <Tooltip title={'تایید'}>
                    <span
                        className={`cursor-pointer p-2 hover:${textTheme}`}
                        onClick={OnSetApproval}
                    >
                        <BiCheck />
                    </span>
                </Tooltip>
            )}
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
