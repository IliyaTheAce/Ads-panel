import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { GetCommonData } from '@/services/CommonServices'

export type appState = {
    deleteConfirmation: boolean
    selectedId?: string
    editSideBarOpen: boolean
    viewSideBarOpen: boolean
    createSideBarOpen: boolean
    commonData: {
        categories: {
            label: string
            value: number
        }[]
    }
}

const initialState: appState = {
    deleteConfirmation: false,
    editSideBarOpen: false,
    viewSideBarOpen: false,
    selectedId: undefined,
    createSideBarOpen: false,
    commonData: {
        categories: [],
    },
}

export const getCommonData = createAsyncThunk(
    'app/data/getCommonData',
    async () => {
        const response = await GetCommonData()
        return response.data.data
    }
)

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
    extraReducers: (builder) => {
        builder.addCase(getCommonData.fulfilled, (state, action) => {
            const categories: {
                label: string
                value: number
            }[] = []
            action.payload.categories.map((item) =>
                categories.push({
                    label: item.name,
                    value: item.id,
                })
            )
            state.commonData = { categories }
        })
    },
})

export const {
    toggleCreateSideBar,
    toggleDeleteConfirmation,
    setSelectedId,
    toggleEditSideBar,
    toggleViewSideBar,
} = appSlice.actions
export default appSlice.reducer
