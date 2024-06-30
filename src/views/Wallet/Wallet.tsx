import { AiOutlineReload } from 'react-icons/ai'
import { AdaptableCard } from '@/components/shared'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useEffect, useState } from 'react'
import { IInvoice, ITransaction } from '@/@types/data'
import { GetInvoiceList, GetTransactions } from '@/services/WalletService'
import { Button, Tabs } from '@/components/ui'
import TransactionsTable from '@/views/Wallet/Components/TransactionsTable'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import TabContent from '@/components/ui/Tabs/TabContent'
import WithdrawConfirmDialog from '@/views/Wallet/Components/WithdrawConfirmDialog'
import InvoicesTable from '@/views/Wallet/Components/InvoicesTable'

export default function Wallet() {
    const { textTheme } = useThemeClass()
    const [transactionsData, setTransactionsData] = useState<ITransaction[]>([])
    const [invoiceData, setInvoiceData] = useState<IInvoice[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setDialogOpen] = useState(false)
    const FetchData = () => {
        setLoading(true)

        GetTransactions()
            .then((res) => {
                setTransactionsData(res.data.data.transactions)
                setLoading(false)
            })
            .catch((error) => console.log(error.message))

        GetInvoiceList()
            .then((res) => {
                setInvoiceData(res.data.data.invoices)
                setLoading(false)
            })
            .catch((error) => console.log(error.message))
    }
    useEffect(() => {
        FetchData()
    }, [])
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">امور مالی</h3>
                <div className={'inline-flex items-center gap-2'}>
                    <button
                        className={`flex items-center justify-center cursor-pointer  p-2 hover:${textTheme} text-2xl transition-colors`}
                        onClick={FetchData}
                    >
                        <AiOutlineReload />
                    </button>
                </div>
            </div>

            <div className="lg:flex items-center justify-between mb-4 font-base text-xl">
                <h5 className="mb-4 lg:mb-0">موجودی کیف پول: 1800000</h5>
                <Button
                    variant={'solid'}
                    className={`flex items-center justify-center cursor-pointer  p-2 hover:${textTheme} text-sm transition-colors`}
                    onClick={() => {
                        setDialogOpen(true)
                    }}
                >
                    برداشت پول
                    {/*<AiOutlineReload />*/}
                </Button>
            </div>
            <div>
                <Tabs defaultValue="transactions" variant={'pill'}>
                    <TabList>
                        <TabNav value="transactions">نراکنش های کیف پول</TabNav>
                        <TabNav value="invoices">صورت حساب ها</TabNav>
                        <TabNav value="tab3">Contact</TabNav>
                    </TabList>
                    <div className="p-4">
                        <TabContent value="transactions">
                            <TransactionsTable
                                loading={loading}
                                data={transactionsData}
                                onRefresh={FetchData}
                            />
                        </TabContent>
                        <TabContent value="invoices">
                            <InvoicesTable
                                loading={loading}
                                data={invoiceData}
                                onRefresh={FetchData}
                            />
                        </TabContent>
                        <TabContent value="tab3">
                            <p>
                                In C++ its harder to shoot yourself in the foot,
                                but when you do, you blow off your whole leg.
                                (Bjarne Stroustrup)
                            </p>
                        </TabContent>
                    </div>
                </Tabs>
            </div>

            <WithdrawConfirmDialog
                onClose={() => setDialogOpen(false)}
                isOpen={isDialogOpen}
                onSuccess={() => {
                    FetchData()
                    setDialogOpen(false)
                }}
            />
        </AdaptableCard>
    )
}
