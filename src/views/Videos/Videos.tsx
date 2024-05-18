import { AdaptableCard } from '@/components/shared'
import { useEffect, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { IContent } from '@/@types/data'
import useThemeClass from '@/utils/hooks/useThemeClass'
import PublisherDeleteConfirmation from '@/views/Publishers/Components/PublisherDeleteConfirmation'
import { GetContentsList } from '@/services/ContentsService'
import UsersTable from '@/views/Videos/Components/VideosTable'

const Videos = () => {
    const [data, setData] = useState<IContent[]>([])
    const [loading, setLoading] = useState(true)
    const FetchData = () => {
        setLoading(true)

        GetContentsList({})
            .then((res) => {
                setData(res.data.data.contents)
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
                <h3 className="mb-4 lg:mb-0">لیست محتوا ها</h3>
                <div className={'inline-flex items-center gap-2'}>
                    <button
                        className={`flex items-center justify-center cursor-pointer  p-2 hover:${textTheme} text-2xl transition-colors`}
                        onClick={FetchData}
                    >
                        <AiOutlineReload />
                    </button>
                </div>
            </div>
            <UsersTable loading={loading} data={data} onRefresh={FetchData} />
            <PublisherDeleteConfirmation onSuccess={FetchData} />
        </AdaptableCard>
    )
}

export default Videos
