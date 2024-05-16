import { getDashboardData, useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from 'react'
import { Loading } from '@/components/shared'
import Statistic from '@/views/Dashboard/Components/Statistics'
import ViewReport from '@/views/Dashboard/Components/ViewReport'

export default function Dashboard() {
    const dispatch = useAppDispatch()

    const { statisticData, viewReport } = useAppSelector(
        (state) => state.dashboard.dashboard.dashboardData
    )
    const loading = useAppSelector((state) => state.dashboard.dashboard.loading)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getDashboardData())
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={loading}>
                <Statistic data={statisticData} />
                <ViewReport data={viewReport} />
            </Loading>
        </div>
    )
}