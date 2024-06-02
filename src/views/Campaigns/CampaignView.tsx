import { Chart, Loading } from '@/components/shared'
import { ReactNode } from 'react'
import { Card, Tag } from '@/components/ui'
import { GetCampaign, GetCampaignEvents } from '@/services/CampiagnsService'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useParams } from 'react-router-dom'
import {
    BiCategory,
    BiCoin,
    BiCoinStack,
    BiVideo,
    BsConeStriped,
    GrStatusUnknown,
    MdTitle,
    SlCalender,
} from 'react-icons/all'
import { CostMode } from '@/@types/common'
import { useQuery } from '@tanstack/react-query'
import ContentTable from '@/views/Campaigns/Components/ContentTable'
import EventsTable from '@/views/Campaigns/Components/EventsTable'

const CampaignView = () => {
    const { id } = useParams()
    const chartInitialData: {
        chart: {
            series: { name: string; data: number[] }[]
            categories: string[]
        }
        days: { amount: number; date: string }[]
    } = {
        chart: {
            categories: [],
            series: [],
        },
        days: [],
    }
    const eventsQuery = useQuery({
        queryKey: ['events', id],
        queryFn: async () => {
            const response = await GetCampaignEvents(id)
            console.log(response.data.data)
            return response.data.data
        },
    })

    const campaignsQuery = useQuery({
        queryKey: ['campaign', id],
        queryFn: async () => {
            const response = await GetCampaign(id)
            return response.data.data.campaign
        },
    })

    const { textTheme } = useThemeClass()

    return (
        <Loading loading={campaignsQuery.isLoading}>
            <Card
                className="h-full "
                bodyClass="h-full"
                header={`کمپین ${campaignsQuery.data?.title}`}
            >
                <div className={' grid grid-cols-2'}>
                    <div>
                        <InformationSession
                            icon={<MdTitle />}
                            title={'عنوان'}
                            content={campaignsQuery.data?.title}
                        />
                        <InformationSession
                            icon={<BiVideo />}
                            title={'مدل کمپین'}
                            content={campaignsQuery.data?.type}
                        />
                        <InformationSession
                            icon={<GrStatusUnknown />}
                            title={'وضعیت کمپین'}
                            content={
                                campaignsQuery.data?.is_enabled ? (
                                    <Tag prefix prefixClass="bg-emerald-500">
                                        فعال
                                    </Tag>
                                ) : (
                                    <Tag prefix prefixClass="bg-rose-500">
                                        غیر فعال
                                    </Tag>
                                )
                            }
                        />
                        <InformationSession
                            icon={<SlCalender />}
                            title={'تاریخ شروع'}
                            content={campaignsQuery.data?.start_time}
                        />
                        <InformationSession
                            icon={<SlCalender />}
                            title={'تاریخ پایان'}
                            content={
                                campaignsQuery.data?.end_time
                                    ? campaignsQuery.data.end_time
                                    : 'مشخص نشده'
                            }
                        />
                        <InformationSession
                            icon={<BiCoinStack />}
                            title={'بودجه'}
                            content={campaignsQuery.data?.budget}
                        />
                        <InformationSession
                            icon={<BiCoin />}
                            title={'بودجه روزانه'}
                            content={campaignsQuery.data?.budget_daily}
                        />
                        <InformationSession
                            icon={<BiCategory />}
                            title={'دسته بندی'}
                            content={campaignsQuery.data?.category.name}
                        />
                        <InformationSession
                            icon={<BsConeStriped />}
                            title={'نحوه پخش'}
                            content={CostMode.map((item) => {
                                if (
                                    campaignsQuery.data?.cost_mode ===
                                    item.value
                                )
                                    return item.label
                            })}
                        />
                        <InformationSession
                            icon={<BsConeStriped />}
                            title={'مصرف روزانه'}
                            content={campaignsQuery.data?.daily_spent}
                        />

                        {eventsQuery.status === 'success' && (
                            <EventsTable
                                loading={eventsQuery.isLoading}
                                data={eventsQuery.data.days}
                            />
                        )}
                    </div>
                    <div>
                        {eventsQuery.status === 'success' && (
                            <Chart
                                direction={'rtl'}
                                series={eventsQuery.data?.chart.series}
                                xAxis={eventsQuery.data?.chart.categories}
                                height="380px"
                                customOptions={{ legend: { show: false } }}
                            />
                        )}
                        {campaignsQuery.data && (
                            <ContentTable
                                data={campaignsQuery.data.contents}
                                loading={campaignsQuery.isLoading}
                            />
                        )}
                    </div>
                </div>
            </Card>
        </Loading>
    )
}
const InformationSession = ({
    icon,
    title,
    content,
}: {
    icon: ReactNode
    title: ReactNode | string
    content: ReactNode | string
}) => {
    return (
        <div className="flex mb-5 items-center">
            <div className="text-2xl">{icon}</div>
            <div className="ml-2 rtl:mr-2 w-full inline-flex gap-3 ">
                <div className="flex justify-between items-center">
                    <h6>{title}: </h6>
                </div>
                {content}
            </div>
        </div>
    )
}
export default CampaignView
