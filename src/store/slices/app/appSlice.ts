import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type appState = {
    deleteConfirmation: boolean
    selectedId?: string
    editSideBarOpen: boolean
    viewSideBarOpen: boolean
    createSideBarOpen: boolean
}

const initialState: appState = {
    deleteConfirmation: false,
    editSideBarOpen: false,
    viewSideBarOpen:false,
    selectedId: undefined,
    createSideBarOpen: false,
}

const appSlice = createSlice({
    name: `${SLICE_BASE_NAME}/app`,
    initialState,
    reducers: {
        toggleDeleteConfirmation(state, action: PayloadAction<boolean>) {
            state.deleteConfirmation = action.payload
        },
        toggleEditSideBar(state, action: PayloadAction<boolean>) {
            state.editSideBarOpen = action.payload
        },
        toggleCreateSideBar(state, action: PayloadAction<boolean>) {
            state.createSideBarOpen = action.payload
        },
        toggleViewSideBar(state, action: PayloadAction<boolean>) {
            state.viewSideBarOpen = action.payload
        },
        setSelectedId(state, action: PayloadAction<string>) {
            state.selectedId = action.payload
        },
    },
})

export const {
    toggleCreateSideBar,
    toggleDeleteConfirmation,
    setSelectedId,
    toggleEditSideBar,
    toggleViewSideBar
} = appSlice.actions
export default appSlice.reducer
