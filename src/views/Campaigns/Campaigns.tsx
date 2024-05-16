import { AdaptableCard } from '@/components/shared'
import { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineReload } from 'react-icons/ai'
import { Button } from '@/components/ui'
import { toggleCreateSideBar, useAppDispatch } from "@/store";
import CampaignsTable from "@/views/Campaigns/Components/CampaignsTable";
import { ICampaign } from "@/@types/data";
import { CampaignsList } from "@/services/CampiagnsService";
import useThemeClass from "@/utils/hooks/useThemeClass";
import CampaignDeleteConfirmation from "@/views/Campaigns/Components/CampaignDeleteConfirmation";
import CampaignCreate from "@/views/Campaigns/CampaignCreate";

const Campaigns = () => {
  const [data, setData] = useState<ICampaign[]>([])
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const FetchData = () => {
    setLoading(true)

    setTimeout(() => {
      CampaignsList({})
        .then((res) => {
          setData(res.data.data.campaigns)
          setLoading(false)
        })
        .catch((error) => console.log(error.message))
      setLoading(false)
    }, 1000)
  }
  useEffect(() => {
    FetchData()
  }, [])
  const { textTheme } = useThemeClass()

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">لیست کمپین ها</h3>
        <div className={'inline-flex items-center gap-2'}>
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
      {/*<CategoryEditDrawer onSuccess={FetchData} />*/}
    </AdaptableCard>
  )
}

export default Campaigns
