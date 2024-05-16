import { combineReducers } from '@reduxjs/toolkit'
import dashboard , { dashboardState } from './dashboardSlice'

const reducer = combineReducers({
  dashboard,
})

export type DashboardState = {
  dashboard: dashboardState
}

export * from './dashboardSlice'

export default reducer
