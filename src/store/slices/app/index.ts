import { combineReducers } from '@reduxjs/toolkit'
import app, { appState } from './appSlice'

const reducer = combineReducers({
    app,
})

export type AppState = {
    app: appState
}

export * from './appSlice'

export default reducer
