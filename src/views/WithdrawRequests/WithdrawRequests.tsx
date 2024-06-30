import { AdaptableCard } from '@/components/shared'
import { useEffect, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { IWithdraw } from '@/@types/data'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { SelectBoxType } from '@/@types/common'
import { Select } from '@/components/ui'
import { GetWithdrawRequests } from '@/services/WithdrawService'
import WithdrawRequestsTable from '@/views/WithdrawRequests/Components/WithdrawRequestsTable'
import RequestDeclineConfirmation from '@/views/WithdrawRequests/Components/RequestDeclineConfirmation'
import RequestAcceptConfirmation from '@/views/WithdrawRequests/Components/RequestAcceptConfirmation'
import ShowDialog from '@/views/WithdrawRequests/Components/ShowDialog'

export const StatusModes: SelectBoxType[] = [
    {
        label: 'همه',
        value: -1,
    },
    {
        label: 'در انتظار',
        value: 0,
    },
    {
        label: 'تایید شده',
        value: 1,
    },
    {
        label: 'رد شده',
        value: 2,
    },
]

const WithdrawRequests = () => {
    const [data, setData] = useState<IWithdraw[]>([])
    const [loading, setLoading] = useState(true)

    const [filter, setFilter] = useState<number>(-1)

    const FetchData = () => {
        setLoading(true)

        GetWithdrawRequests({ status: filter })
            .then((res) => {
                setData(res.data.data.witdraws)
                setLoading(false)
            })
            .catch((error) => console.log(error.message))
    }
    useEffect(() => {
        FetchData()
    }, [filter])
    const { textTheme } = useThemeClass()

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">لیست درخواست های برداشت</h3>
                <div className={'flex md:flex-row flex-col items-center gap-5'}>
                    <Select<SelectBoxType>
                        value={StatusModes.filter(
                            (apr) => apr.value === filter
                        )}
                        className={'min-w-[200px] w-full'}
                        options={StatusModes}
                        onChange={(opt) => {
                            setFilter(opt ? opt.value : -1)
                        }}
                    />
                    <button
                        className={`flex items-center justify-center cursor-pointer  p-2 hover:${textTheme} text-2xl transition-colors`}
                        onClick={FetchData}
                    >
                        <AiOutlineReload />
                    </button>
                </div>
            </div>
            <WithdrawRequestsTable
                loading={loading}
                data={data}
                onRefresh={FetchData}
            />

            <RequestDeclineConfirmation onSuccess={() => FetchData()} />
            <RequestAcceptConfirmation onSuccess={() => FetchData()} />
            <ShowDialog title={'اطلاعات بانکی'} />
        </AdaptableCard>
    )
}

export default WithdrawRequests
