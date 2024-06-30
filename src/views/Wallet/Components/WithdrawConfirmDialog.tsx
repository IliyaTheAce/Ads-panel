import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useState } from 'react'
import { WithdrawRequest } from '@/services/WalletService'

export default function WithdrawConfirmDialog({
    onSuccess,
    onClose,
    isOpen,
}: {
    onSuccess: () => void
    onClose: () => void
    isOpen: boolean
}) {
    const [loading, setLoading] = useState(false)
    const onConfirm = async () => {
        const success = await WithdrawRequest()

        if (success.data.result) {
            onSuccess()
            toast.push(
                <Notification
                    title={'عملیات موفق'}
                    type="success"
                    duration={2500}
                >
                    درخواست برداشت ثبت شد.
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={isOpen}
            type="success"
            title="برداشت"
            confirmText={'تایید'}
            cancelText={'لفو'}
            onClose={onClose}
            onRequestClose={onClose}
            onCancel={onClose}
            onConfirm={onConfirm}
        >
            <p>آیا از برداشت مبلغ کیف پول مطمعن هستید؟</p>
        </ConfirmDialog>
    )
}
