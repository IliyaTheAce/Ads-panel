import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeclineConfirmation,
    useAppDispatch,
    useAppSelector,
} from '@/store'
import { DeclineRequest } from '@/services/WithdrawService'
import { useState } from 'react'

const RequestDeclineConfirmation = ({
    onSuccess,
}: {
    onSuccess: () => void
}) => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector((state) => state.app.app.decline)
    const selectedId = useAppSelector((state) => state.app.app.selectedId)
    const onDialogClose = () => {
        dispatch(toggleDeclineConfirmation(false))
    }

    const [note, setNote] = useState<string>('')

    const onDecline = async () => {
        const success = await DeclineRequest(selectedId as string, { note })

        if (success.data.result) {
            onSuccess()
            dispatch(toggleDeclineConfirmation(false))

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
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="رد درخواست"
            confirmButtonColor="red-600"
            confirmText={'تایید'}
            cancelText={'لفو'}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDecline}
        >
            <label>یادداشت:</label>
            <textarea
                onChange={(e) => setNote(e.target.value)}
                className={
                    'w-full mt-2 rounded-xl border-[1px] border-gray-400 p-4 text-gray-600'
                }
            ></textarea>
        </ConfirmDialog>
    )
}

export default RequestDeclineConfirmation
