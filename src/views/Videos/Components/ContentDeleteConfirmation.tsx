import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleDeleteConfirmation } from '@/store/slices/app'
import { ContentDelete } from '@/services/ContentsService'

const ContentDeleteConfirmation = ({
    onSuccess,
}: {
    onSuccess: () => void
}) => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.app.app.deleteConfirmation
    )
    const selectedId = useAppSelector((state) => state.app.app.selectedId)
    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await ContentDelete(selectedId as string)

        if (success.data.result) {
            onSuccess()
            toast.push(
                <Notification
                    title={'عملیات موفق'}
                    type="success"
                    duration={2500}
                >
                    محتوا با موفقیت حذف شد.
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="حذف محتوا"
            confirmButtonColor="red-600"
            confirmText={'تایید'}
            cancelText={'لفو'}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>آیا از حدف محتوا اطمینان دارید؟ این عمل قابل برگشت نیست.</p>
        </ConfirmDialog>
    )
}

export default ContentDeleteConfirmation
