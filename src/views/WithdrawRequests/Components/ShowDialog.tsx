import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { toggleShowDialog, useAppDispatch, useAppSelector } from '@/store'

const ShowDialog = ({ title }: { title: string }) => {
    const dispatch = useAppDispatch()
    const dialogContent = useAppSelector((state) => state.app.app.ShowDialog)

    const onDialogClose = () => {
        dispatch(toggleShowDialog(null))
    }

    return (
        <ConfirmDialog
            isOpen={!!dialogContent}
            type="info"
            title={title}
            confirmText={'بستن'}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDialogClose}
            showCancelButton={false}
        >
            {dialogContent}
        </ConfirmDialog>
    )
}

export default ShowDialog
