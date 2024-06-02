import { Loading } from '@/components/shared'
import { ReactNode, useEffect, useState } from 'react'
import { Dialog } from '@/components/ui'
import { IPublishers } from '@/@types/data'
import { BiCategory, GrDomain, GrStatusUnknown, MdTitle } from 'react-icons/all'
import { CostMode } from '@/@types/common'
import { GetPublisher } from '@/services/PublishersService'
import { toggleViewSideBar, useAppDispatch, useAppSelector } from '@/store'

const CampaignView = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector((state) => state.app.app.viewSideBarOpen)
    const selectedId = useAppSelector((state) => state.app.app.selectedId)
    const [data, setData] = useState<IPublishers>()

    useEffect(() => {
        if (!dialogOpen || !selectedId) return
        GetPublisher(selectedId)
            .then((res) => {
                setData(res.data.data.publisher)
            })
            .catch((error) => console.log(error.message))
    }, [selectedId])

    const onClose = () => {
        setData(undefined)
        dispatch(toggleViewSideBar(false))
    }

    return (
        <Dialog isOpen={dialogOpen} onClose={onClose}>
            <Loading loading={!data}>
                <div className="lg:flex mb-4">
                    <h4 className="mb-4 lg:mb-0">پخش کننده {data?.title}</h4>
                </div>
                <InformationSession
                    icon={<MdTitle />}
                    title={'عنوان'}
                    content={data?.title}
                />
                <InformationSession
                    icon={<GrDomain />}
                    title={'دامنه'}
                    content={data?.domain}
                />
                <InformationSession
                    icon={<GrStatusUnknown />}
                    title={'نوع'}
                    content={
                        data?.costId !== undefined
                            ? CostMode[data?.costId].label
                            : ''
                    }
                />
                <InformationSession
                    icon={<BiCategory />}
                    title={'تاریخ شروع'}
                    content={data?.categories.map(
                        (item, index) =>
                            `${item.name} ${
                                index !== 0 &&
                                index !== data?.categories.length - 1
                                    ? ','
                                    : ''
                            }`
                    )}
                />
            </Loading>
        </Dialog>
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
