import { Chart, Loading } from '@/components/shared'
import { ReactNode, useEffect, useState } from 'react'
import { Card, Tag } from '@/components/ui'
import { useAppDispatch } from '@/store'
import { ICampaign } from '@/@types/data'
import { GetCampaign } from '@/services/CampiagnsService'
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
import { COLORS } from '@/constants/chart.constant'
import ContentTable from '@/views/Campaigns/Components/ContentTable'
import { CostMode } from '@/@types/common'

const CampaignView = () => {
    const [data, setData] = useState<ICampaign>()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const FetchData = () => {
        if (!id) {
            throw Error('No Id provided!')
        }
        setLoading(true)

        GetCampaign(id)
            .then((res) => {
                setData(res.data.data.campaign)
                setLoading(false)
            })
            .catch((error) => console.log(error.message))
    }
    useEffect(() => {
        FetchData()
    }, [])
    const { textTheme } = useThemeClass()

    return (
        <Loading loading={loading}>
            <Card
                className="h-full "
                bodyClass="h-full"
                header={`کمپین ${data?.title}`}
            >
                <div className={' grid grid-cols-2'}>
                    <div>
                        <InformationSession
                            icon={<MdTitle />}
                            title={'عنوان'}
                            content={data?.title}
                        />
                        <InformationSession
                            icon={<BiVideo />}
                            title={'مدل کمپین'}
                            content={data?.type}
                        />
                        <InformationSession
                            icon={<GrStatusUnknown />}
                            title={'وضعیت کمپین'}
                            content={
                                data?.is_enabled ? (
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
                            content={data?.start_time}
                        />
                        <InformationSession
                            icon={<SlCalender />}
                            title={'تاریخ پایان'}
                            content={
                                data?.end_time ? data.end_time : 'مشخص نشده'
                            }
                        />
                        <InformationSession
                            icon={<BiCoinStack />}
                            title={'بودجه'}
                            content={data?.budget}
                        />
                        <InformationSession
                            icon={<BiCoin />}
                            title={'بودجه روزانه'}
                            content={data?.budget_daily}
                        />
                        <InformationSession
                            icon={<BiCategory />}
                            title={'دسته بندی'}
                            content={data?.category.name}
                        />
                        <InformationSession
                            icon={<BsConeStriped />}
                            title={'نحوه پخش'}
                            content={CostMode.map((item) => {
                                if (data?.cost_mode === item.value)
                                    return item.label
                            })}
                        />
                        <InformationSession
                            icon={<BsConeStriped />}
                            title={'مصرف روزانه'}
                            content={data?.daily_spent}
                        />
                    </div>
                    <div>
                        <Chart
                            direction={'rtl'}
                            className={'mb-5'}
                            donutTitle={'بودجه'}
                            series={
                                data ? [data.budget_daily, data.budget] : []
                            }
                            height={250}
                            customOptions={{
                                colors: COLORS,
                                dataLabels: {
                                    enabled: true,
                                },
                                legend: { position: 'right' },
                                labels: ['بودجه روزانه', 'بودجه مانده'],
                            }}
                            type="donut"
                        />
                        {data?.contents !== undefined && (
                            <ContentTable
                                data={data?.contents}
                                loading={loading}
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
