import { Server, Response } from 'miragejs'
import uniqueId from 'lodash/uniqueId'
import isEmpty from 'lodash/isEmpty'
import { StatisticType } from "@/store";

export default function dashboardFakeApi(server: Server, apiPrefix: string) {
  server.get(`${apiPrefix}/dashboard`, (schema) => {
    // @ts-ignore
    const statistics = schema.db.StatisticsData
    console.log(statistics)
    // @ts-ignore
    const views = schema.db.ViewReportData[0].salesReportData
    if (statistics) {
      return {
        statisticData: statistics,
        viewReport:views
      }
    }
    return new Response(
      401,
      { message: 'نام کاربری یا رمز عبور اشتباه است!' }
    )
  })

}
