import { AdaptableCard } from '@/components/shared'
import { useEffect, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import CampaignsTable from '@/views/Campaigns/Components/CampaignsTable'
import { ICampaign } from '@/@types/data'
import { CampaignsList } from '@/services/CampiagnsService'
import useThemeClass from '@/utils/hooks/useThemeClass'
import CampaignDeleteConfirmation from '@/views/Campaigns/Components/CampaignDeleteConfirmation'
import { Input, Select } from '@/components/ui'
import { ApprovedModes, SelectBoxType } from '@/@types/common'
import { useAppSelector } from '@/store'
import useAuthority from '@/utils/hooks/useAuthority'

const Campaigns = () => {
    const [data, setData] = useState<ICampaign[]>([])
    const [loading, setLoading] = useState(true)
    const { categories: cat } = useAppSelector(
        (state) => state.app.app.commonData
    )
    const categories: SelectBoxType[] = [{ label: 'همه', value: -1 }, ...cat]

    const { authority } = useAppSelector((state) => state.auth.user)
    //TODO: Add expired
    const hasAuthory = useAuthority(authority, ['admin'])
    const [filter, setFilter] = useState<{
        category: number
        approved: number
        keyword: string
    }>({
        approved: -1,
        keyword: '',
        category: -1,
    })
    const FetchData = () => {
        setLoading(true)
        console.log(filter.category)
        CampaignsList({
            approved: filter.approved,
            category_id: filter.category,
            keyword: filter.keyword,
        })
            .then((res) => {
                setData(res.data.data.campaigns)
                setLoading(false)
            })
            .catch((error) => console.log(error.message))
    }
    useEffect(() => {
        FetchData()
    }, [filter.approved, filter.category])
    const { textTheme } = useThemeClass()

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">لیست کمپین ها</h3>
                <div className={'flex md:flex-row flex-col items-center gap-5'}>
                    {hasAuthory && (
                        <>
                            <Input
                                placeholder={'جستجو...'}
                                onChange={(event) =>
                                    setFilter((prev) => {
                                        return {
                                            ...prev,
                                            keyword: event.target.value,
                                        }
                                    })
                                }
                                onKeyUp={(event) => {
                                    if (event.key === 'Enter') {
                                        FetchData()
                                    }
                                }}
                            />
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
                            <Select<SelectBoxType>
                                value={categories.filter(
                                    (cat) => cat.value === filter.category
                                )}
                                className={'min-w-[200px] w-full'}
                                options={categories}
                                onChange={(opt) => {
                                    setFilter((prev) => {
                                        return {
                                            ...prev,
                                            category: opt ? opt.value : -1,
                                        }
                                    })
                                }}
                            />
                        </>
                    )}
                    <button
                        className={`flex items-center justify-center cursor-pointer  p-2 hover:${textTheme} text-2xl transition-colors`}
                        onClick={FetchData}
                    >
                        <AiOutlineReload />
                    </button>
                </div>
            </div>
            <CampaignsTable
                loading={loading}
                data={data}
                onRefresh={FetchData}
            />
            <CampaignDeleteConfirmation onSuccess={FetchData} />
        </AdaptableCard>
    )
}

export default Campaigns
