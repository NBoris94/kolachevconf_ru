import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {logout, setCredentials} from '@/redux/features/authSlice'
import {IUser, UserResponse} from '@/interfaces/users'
import {RootState} from '@/redux/store'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken

        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {

        // send refresh token to get new access token
        const refreshResult = await baseQuery({
            url: '/auth/refresh',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${api.getState().auth.refreshToken}`,
            }
        }, api, extraOptions)

        if (refreshResult?.data) {
            const user: IUser = api.getState().auth.user
            console.log(refreshResult.data)
            // store the new token
            api.dispatch(setCredentials({ tokens: refreshResult.data, user } as UserResponse))

            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }

    return result
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Participants', 'Sections', 'Auth'],
    endpoints: () => ({}),
})
