import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleApproveConfirmation,
    useAppDispatch,
    useAppSelector,
} from '@/store'
import { ApproveRequest } from '@/services/WithdrawService'
import { useState } from 'react'
import { Input } from '@/components/ui'

const RequestAcceptConfirmation = ({
    onSuccess,
}: {
    onSuccess: () => void
}) => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector((state) => state.app.app.approve)
    const selectedId = useAppSelector((state) => state.app.app.selectedId)
    const onDialogClose = () => {
        dispatch(toggleApproveConfirmation(false))
    }

    const [data, setData] = useState<{
        bank_account: string
        ref_number: string
    }>({ bank_account: '', ref_number: '' })

    const onApprove = async () => {
        const success = await ApproveRequest(selectedId as string, data)

        if (success.data.result) {
            onSuccess()
            dispatch(toggleApproveConfirmation(false))

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
            type="success"
            title="تایید درخواست"
            confirmButtonColor="emerald-600"
            confirmText={'تایید'}
            cancelText={'لفو'}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onApprove}
        >
            <Input
                type={'text'}
                className={'mt-5'}
                placeholder={'شماره کارت'}
                onChange={(e) =>
                    setData((prevState) => {
                        return { ...prevState, bank_account: e.target.value }
                    })
                }
            />
            <Input
                type={'text'}
                className={'mt-2'}
                placeholder={'شماره ارجاع'}
                onChange={(e) =>
                    setData((prevState) => {
                        return { ...prevState, ref_number: e.target.value }
                    })
                }
            />
        </ConfirmDialog>
    )
}

export default RequestAcceptConfirmation
