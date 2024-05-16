import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleDeleteConfirmation } from '@/store/slices/app'
import { CampaignsDelete } from "@/services/CampiagnsService";

const CampaignDeleteConfirmation = ({
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
        const success = await CampaignsDelete(selectedId as string)

        if (success.data.result) {
            onSuccess()
            toast.push(
                <Notification
                    title={'عملیات موفق'}
                    type="success"
                    duration={2500}
                >
                    کمپین با موفقیت حذف شد.
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
            title="حذف کمپین"
            confirmButtonColor="red-600"
            confirmText={'تایید'}
            cancelText={'لفو'}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>آیا از حدف کمپین اطمینان دارید؟ این عمل قابل برگشت نیست.</p>
        </ConfirmDialog>
    )
}

export default CampaignDeleteConfirmation
