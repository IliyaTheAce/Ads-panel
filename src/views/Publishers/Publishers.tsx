import { AdaptableCard } from '@/components/shared'
import { useEffect, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { IPublishers } from '@/@types/data'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { PublishersList } from '@/services/PublishersService'
import PublishersTable from '@/views/Publishers/Components/PublishersTable'
import PublisherDeleteConfirmation from '@/views/Publishers/Components/PublisherDeleteConfirmation'
import PublisherView from '@/views/Publishers/PublisherView'

const Publishers = () => {
    const [data, setData] = useState<IPublishers[]>([])
    const [loading, setLoading] = useState(true)
    const FetchData = () => {
        setLoading(true)

        PublishersList({})
            .then((res) => {
                setData(res.data.data.publishers)
                setLoading(false)
            })
            .catch((error) => console.log(error.message))
    }
    useEffect(() => {
        FetchData()
    }, [])
    const { textTheme } = useThemeClass()

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">لیست پخش کننده ها</h3>
                <div className={'inline-flex items-center gap-2'}>
                    <button
                        className={`flex items-center justify-center cursor-pointer  p-2 hover:${textTheme} text-2xl transition-colors`}
                        onClick={FetchData}
                    >
                        <AiOutlineReload />
                    </button>
                </div>
            </div>
            <PublishersTable
                loading={loading}
                data={data}
                onRefresh={FetchData}
            />
            <PublisherDeleteConfirmation onSuccess={FetchData} />
            <PublisherView />
        </AdaptableCard>
    )
}

export default Publishers
