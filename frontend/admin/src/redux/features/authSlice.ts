import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {IUser, UserResponse} from '@/interfaces/users'
import {RootState} from '@/redux/store'

interface AuthState {
    user: IUser | null
    accessToken: string | null
    refreshToken: string | null
}

const INITIAL_STATE: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        setCredentials: (state, action: PayloadAction<UserResponse>) => {
            const { user, tokens} = action.payload
            state.user = user
            state.accessToken = tokens.accessToken
            state.refreshToken = tokens.refreshToken
        },
        logout: () => INITIAL_STATE
    }
})

export const {
    setCredentials,
    logout
} = authSlice.actions

const persistConfig = {
    key: 'auth',
    storage
}

const authPersistSlice = persistReducer(persistConfig, authSlice.reducer)
export default authPersistSlice

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken
