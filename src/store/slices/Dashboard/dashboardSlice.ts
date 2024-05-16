import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { GetDashboardData } from "@/services/DashboardService";

export type StatisticType = {
  key: string
  label: string
  value: number
  growShrink: number
}
export type ViewReportType = {
  series: {
    name: string
    data: number[]
  }[]
  categories: string[]
}

// export type LeadRegion = {
//   name: string
//   value: number
// }
//
// export type Lead = {
//   id: number
//   name: string
//   avatar: string
//   status: number
//   createdTime: number
//   email: string
//   assignee: string
// }
//
// export type Emails = {
//   precent: number
//   opened: number
//   unopen: number
//   total: number
// }

export type DashboardData = {
  statisticData: StatisticType[]
  viewReport?: ViewReportType
  // recentLeadsData: Lead[]
  // emailSentData: {
  //   precent: number
  //   opened: number
  //   unopen: number
  //   total: number
  // }
}

type DashboardDataResponse = DashboardData

export type dashboardState = {
  loading: boolean
  dashboardData: Partial<DashboardData>
}

export const SLICE_NAME = 'dashboard'

export const getDashboardData = createAsyncThunk(
  'dashboard/data/getDashboardData',
  async () => {
    const response =
      await GetDashboardData<DashboardDataResponse>()
    return response.data
  }
)

const initialState: dashboardState = {
  loading: true,
  dashboardData: {},
}

const dashboardSlice = createSlice({
  name: `${SLICE_NAME}/state`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.dashboardData = action.payload
        state.loading = false
      })
      .addCase(getDashboardData.pending, (state) => {
        console.log(state)
        state.loading = true
      })
  },
})

export default dashboardSlice.reducer
