import { Dialog } from '@/components/ui'
import { BiIdCard, BiPhone, BsPerson, MdAlternateEmail } from 'react-icons/all'
import { ReactNode, useEffect, useState } from 'react'
import { toggleViewSideBar, useAppDispatch, useAppSelector } from '@/store'
import { GetUser } from '@/services/UsersService'
import { IUser } from '@/@types/data'
import { Loading } from '@/components/shared'

export default function UserDetailsDialog() {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector((state) => state.app.app.viewSideBarOpen)
    const selectedId = useAppSelector((state) => state.app.app.selectedId)
    const [data, setData] = useState<IUser>()
    useEffect(() => {
        if (!dialogOpen || !selectedId) return
        GetUser(selectedId).then((response) => {
            setData(response.data.data.user)
        })
    }, [selectedId])

    const onClose = () => {
        setData(undefined)
        dispatch(toggleViewSideBar(false))
    }

    return (
        <Dialog isOpen={dialogOpen} onClose={onClose}>
            <Loading loading={!data}>
                <div className="lg:flex mb-4">
                    <h4 className="mb-4 lg:mb-0">مشاهده کاربر</h4>
                </div>
                <InformationSession
                    icon={<BsPerson />}
                    title={'نام'}
                    content={data?.firstname + ' ' + data?.lastname}
                />

                <InformationSession
                    icon={<BiIdCard />}
                    title={'نام کاربری'}
                    content={data?.username}
                />
                <InformationSession
                    icon={<MdAlternateEmail />}
                    title={'ایمیل'}
                    content={data?.email}
                />
                <InformationSession
                    icon={<BiPhone />}
                    title={'موبایل'}
                    content={data?.mobile}
                />
                {/*<InformationSession*/}
                {/*    icon={<MdOutlinePermIdentity />}*/}
                {/*    title={'دسترسی'}*/}
                {/*    content={data?.role}*/}
                {/*/>*/}
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
            <div className="ml-2 rtl:mr-2 w-full inline-flex gap-3 items-center">
                <div className="flex justify-between items-center">
                    <h6>{title}: </h6>
                </div>
                {content}
            </div>
        </div>
    )
}
