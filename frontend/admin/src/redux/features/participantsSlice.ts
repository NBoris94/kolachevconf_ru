import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'

export interface ISort {
    type: string
    orderBy: 'ASC' | 'DESC'
}

interface ParticipantsState {
    currentPage: number
    limit: number
    search: string
    sort: ISort
    sectionId?: number
    isOpenInfo: boolean
    participantInfoId?: number
    isOpenDelete: boolean
    participantDeleteId?: number
}

const INITIAL_STATE: ParticipantsState = {
    currentPage: 1,
    limit: 10,
    search: '',
    sort: {
        type: 'createdAt',
        orderBy: 'DESC'
    },
    isOpenInfo: false,
    isOpenDelete: false
}

export const participantsSlice = createSlice({
    name: 'participants',
    initialState: INITIAL_STATE,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },

        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
            state.currentPage = 1
        },

        setSectionId: (state, action: PayloadAction<number | undefined>) => {
            state.sectionId = action.payload
        },

        setSort: (state, action: PayloadAction<ISort>) => {
            state.sort.type = action.payload.type
            state.sort.orderBy = action.payload.orderBy
        },

        setIsOpenInfo: (state, action: PayloadAction<{isOpenInfo: boolean, participantInfoId?: number}>) => {
            state.isOpenInfo = action.payload.isOpenInfo
            if (action.payload.isOpenInfo) {
                state.participantInfoId = action.payload.participantInfoId
            }
        },

        setIsOpenDelete: (state, action: PayloadAction<{isOpenDelete: boolean, participantDeleteId?: number}>) => {
            state.isOpenDelete = action.payload.isOpenDelete
            if (action.payload.isOpenDelete) {
                state.participantDeleteId = action.payload.participantDeleteId
            }
        },

        resetParticipantsFilter: () => INITIAL_STATE
    }
})

export const {
    setPage,
    setSearch,
    setSectionId,
    setSort,
    setIsOpenInfo,
    setIsOpenDelete,
    resetParticipantsFilter
} = participantsSlice.actions

const persistConfig = {
    key: 'participants',
    storage
}

const participantsPersistSlice = persistReducer(persistConfig, participantsSlice.reducer)
export default participantsPersistSlice
