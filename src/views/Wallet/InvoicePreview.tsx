import { Button, Card, Checkbox } from '@/components/ui'
import Table from '../../components/ui/Table'
import THead from '@/components/ui/Table/THead'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { useEffect, useState } from 'react'
import { ApiInvoicePreview, ApiInvoiceStore } from '@/services/CampiagnsService'
import { useNavigate, useParams } from 'react-router-dom'
import { Loading } from '@/components/shared'

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
export default function InvoicePreview() {
    const { id } = useParams()
    const [data, setData] = useState<IInvoice>()
    const [fromWallet, setFromWallet] = useState(false)
    useEffect(() => {
        if (!id) return
        ApiInvoicePreview(id).then((response) => {
            setData(response.data.data.campaign)
        })
    }, [])
    const nav = useNavigate()
    const Store = () => {
        if (!id) return
        ApiInvoiceStore(id, fromWallet).then((response) => {
            if (response.data.result) {
                if (response.data.data.needPay) {
                    window.open(response.data.data.invoice.url)
                } else {
                    nav(`/app/payment/successful/${id}`)
                }
            }
        })
    }

    return (
        <Loading loading={!data}>
            <Card title={'پیش فاکتور'} header={'پیش فاکتور'} className={'mt-5'}>
                <div
                    className={`flex gap-2 items-center ${
                        data?.amount_wallet === data?.amount && 'text-gray-400'
                    }`}
                >
                    <Checkbox
                        disabled={data?.amount_wallet === data?.total_amount}
                        onChange={(values) => {
                            setFromWallet(values)
                        }}
                    />
                    پرداخت از کیف پول
                </div>
                <PreviewInvoiceTable
                    amount={data?.amount}
                    title={data?.title}
                    tax_amount={data?.tax_amount}
                    wallet={fromWallet ? data?.amount_wallet : undefined}
                    total_amount={
                        fromWallet ? data?.amount_wallet : data?.total_amount
                    }
                />
                <Button variant={'solid'} onClick={Store}>
                    پرداخت
                </Button>
            </Card>
        </Loading>
    )
}

export const PreviewInvoiceTable = (data: {
    className?: string
    title?: string
    amount?: number
    tax_amount?: number
    total_amount?: number
    wallet?: number
}) => {
    return (
        <Table className={data.className} id={'invoicetable'}>
            <THead>
                <Tr>
                    <Th>ردیف</Th>
                    <Th>عنوان</Th>
                    <Th>مبلغ</Th>
                </Tr>
            </THead>
            <TBody>
                <Tr>
                    <Td>1</Td>
                    <Td>{data?.title} </Td>
                    <Td>{data?.amount}</Td>
                </Tr>
                <Tr>
                    <Td>2</Td>
                    <Td>مالیات 10% </Td>
                    <Td>{data?.tax_amount}</Td>
                </Tr>
                {data.wallet && (
                    <Tr>
                        <Td>{data.wallet && 3}</Td>
                        <Td>برداشت از کیف پول </Td>
                        <Td>{data?.wallet}</Td>
                    </Tr>
                )}
                <Tr>
                    <Td>{data.wallet ? 4 : 3}</Td>
                    <Td>مبلغ کل </Td>
                    <Td>{data?.total_amount}</Td>
                </Tr>
            </TBody>
        </Table>
    )
}
