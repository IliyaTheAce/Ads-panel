import { Button, Card } from '@/components/ui'
import Table from '../../components/ui/Table'
import THead from '@/components/ui/Table/THead'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { useEffect, useState } from 'react'
import { ApiInvoicePreview, ApiInvoiceStore } from '@/services/CampiagnsService'
import { useParams } from 'react-router-dom'
import { Loading } from '@/components/shared'

interface IInvoice {
    uid: string
    title: string
    amount: number
    tax_amount: number
    total_amount: number
    start_time: string
    end_time: string
}
export default function InvoicePreview() {
    const { id } = useParams()
    const [data, setData] = useState<IInvoice>()
    useEffect(() => {
        if (!id) return
        ApiInvoicePreview(id).then((response) => {
            setData(response.data.data.campaign)
        })
    }, [])

    const Store = () => {
        if (!id) return
        ApiInvoiceStore(id).then((response) => {
            //TODO: Correct the repsponse
        })
    }

    return (
        <Loading loading={!data}>
            <Card title={'پیش فاکتور'} header={'پیش فاکتور'} className={'mt-5'}>
                <PreviewInvoiceTable {...data} />
                <Button variant={'solid'}>پرداخت</Button>
            </Card>
        </Loading>
    )
}

export const PreviewInvoiceTable = (data: {
    title?: string
    amount?: number
    tax_amount?: number
    total_amount?: number
}) => {
    return (
        <Table>
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
                </Tr>{' '}
                <Tr>
                    <Td>3</Td>
                    <Td>مبلغ کل </Td>
                    <Td>{data?.total_amount}</Td>
                </Tr>
            </TBody>
        </Table>
    )
}
