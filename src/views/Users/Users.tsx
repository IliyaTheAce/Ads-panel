import { AdaptableCard } from '@/components/shared'
import { useEffect, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { IUser } from '@/@types/data'
import useThemeClass from '@/utils/hooks/useThemeClass'
import UsersTable from '@/views/Users/Components/UsersTable'
import { GetUsersList } from '@/services/UsersService'
import { Button } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import UserDetailsDialog from '@/views/Users/Components/UserDetailsDialog'

const Users = () => {
    const [data, setData] = useState<IUser[]>([])
    const [loading, setLoading] = useState(true)
    const FetchData = () => {
        setLoading(true)

        GetUsersList({})
            .then((res) => {
                setData(res.data.data.users)
                setLoading(false)
            })
            .catch((error) => console.log(error.message))
    }
    useEffect(() => {
        FetchData()
    }, [])
    const { textTheme } = useThemeClass()
    const nav = useNavigate()
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">لیست کاربران</h3>
                <div className={'inline-flex items-center gap-2'}>
                    <Button
                        variant={'solid'}
                        onClick={() => nav(`${APP_PREFIX_PATH}/users/create`)}
                    >
                        کاربر جدید
                    </Button>
                    <button
                        className={`flex items-center justify-center cursor-pointer  p-2 hover:${textTheme} text-2xl transition-colors`}
                        onClick={FetchData}
                    >
                        <AiOutlineReload />
                    </button>
                </div>
            </div>
            <UsersTable loading={loading} data={data} onRefresh={FetchData} />
            <UserDetailsDialog />
        </AdaptableCard>
    )
}

export default Users
