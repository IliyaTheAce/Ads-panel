import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'

type ViewReportProps = {
  data?: {
    series?: {
      name: string
      data: number[]
    }[]
    categories?: string[]
  }
  className?: string
}

const ViewReport = ({ className, data = {} }: ViewReportProps) => {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between ">
        <h4>گزارش بازدید</h4>
      </div>
      <Chart
        direction={'rtl'}
        series={data.series}
        xAxis={data.categories}
        height="380px"
        customOptions={{ legend: { show: false } }}
      />
    </Card>
  )
}

export default ViewReport
