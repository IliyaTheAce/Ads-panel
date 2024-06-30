import { AdaptableCard } from '@/components/shared'
import { useEffect, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { IContent } from '@/@types/data'
import useThemeClass from '@/utils/hooks/useThemeClass'
import PublisherDeleteConfirmation from '@/views/Publishers/Components/PublisherDeleteConfirmation'
import { GetContentsList } from '@/services/ContentsService'
import VideosTable from '@/views/Videos/Components/VideosTable'
import { useAppSelector } from '@/store'
import { ApprovedModes, SelectBoxType } from '@/@types/common'
import { Select } from '@/components/ui'
import useAuthority from '@/utils/hooks/useAuthority'

const Videos = () => {
    const [data, setData] = useState<IContent[]>([])
    const [loading, setLoading] = useState(true)
    const { categories: cat } = useAppSelector(
        (state) => state.app.app.commonData
    )
    const categories: SelectBoxType[] = [{ label: 'همه', value: -1 }, ...cat]
    const [filter, setFilter] = useState<{
        // category: number
        approved: number
        // keyword: string
    }>({
        approved: -1,
        // keyword: '',
        // category: -1,
    })

    const { authority } = useAppSelector((state) => state.auth.user)

    const hasAuthory = useAuthority(authority, ['admin'])

    const FetchData = () => {
        setLoading(true)

        GetContentsList({
            approved: filter.approved,
            // category_id: filter.category,
        })
            .then((res) => {
                setData(res.data.data.contents)
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
                <h3 className="mb-4 lg:mb-0">لیست محتوا ها</h3>
                <div className={'flex md:flex-row flex-col items-center gap-5'}>
                    {hasAuthory && (
                        <Select<SelectBoxType>
                            value={ApprovedModes.filter(
                                (apr) => apr.value === filter.approved
                            )}
                            className={'min-w-[200px] w-full'}
                            options={ApprovedModes}
                            onChange={(opt) => {
                                setFilter((prev) => {
                                    return {
                                        ...prev,
                                        approved: opt ? opt.value : -1,
                                    }
                                })
                            }}
                        />
                    )}
                    <button
                        className={`flex items-center justify-center cursor-pointer  p-2 hover:${textTheme} text-2xl transition-colors`}
                        onClick={FetchData}
                    >
                        <AiOutlineReload />
                    </button>
                </div>
            </div>
            <VideosTable loading={loading} data={data} onRefresh={FetchData} />
            <PublisherDeleteConfirmation onSuccess={FetchData} />
        </AdaptableCard>
    )
}

export default Videos
