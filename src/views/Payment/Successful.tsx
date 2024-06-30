import { BiBadgeCheck } from 'react-icons/all'
import { AdaptableCard } from '@/components/shared'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ApiInvoicePreview } from '@/services/CampiagnsService'
import { PreviewInvoiceTable } from '@/views/Wallet/InvoicePreview'
import { Button } from '@/components/ui'
import { useReactToPrint } from 'react-to-print'

interface IInvoice {
    uid: string
    title: string
    amount: number
    amount_wallet: number
    tax_amount: number
    total_amount: number
    start_time: string
    end_time: string
}
export default function Successful() {
    const { slug } = useParams()
    const [data, setData] = useState<IInvoice>()
    useEffect(() => {
        if (!slug) return
        ApiInvoicePreview(slug).then((response) => {
            setData(response.data.data.campaign)
        })
    }, [])

    const handlePrint = useReactToPrint({
        documentTitle: 'Invoice',
        removeAfterPrint: true,
    })

    const Print = () => {
        handlePrint(null, () => document.getElementById('invoicetable'))
    }

    return (
        <AdaptableCard
            className={'mt-5 flex items-center justify-center w-full'}
            bodyClass="w-full"
        >
            <BiBadgeCheck className={'text-green-700 text-[10rem] mx-auto'} />
            <h3 className={'w-full text-center'}>پرداخت موفق</h3>
            <PreviewInvoiceTable
                className={'mt-5'}
                amount={data?.amount}
                title={data?.title}
                tax_amount={data?.tax_amount}
                total_amount={data?.total_amount}
            />
            <Button variant={'solid'} onClick={Print}>
                پرینت
            </Button>
        </AdaptableCard>
    )
}
