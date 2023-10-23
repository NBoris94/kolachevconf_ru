import { configureStore } from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {api} from '@/redux/services/api'
import { persistStore, FLUSH, PAUSE, REHYDRATE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import participantsPersistSlice from '@/redux/features/participantsSlice'
import authSlice from '@/redux/features/authSlice'
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        participants: participantsPersistSlice,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: {
                ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
            }
        }
    ).concat(api.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
