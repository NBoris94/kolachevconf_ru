import { api } from './api'
import {ILogin} from '@/components/pages/auth/Auth.interfaces'
import {UserResponse} from '@/interfaces/users'

interface LoginRequest extends ILogin {}

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: `/auth/login`,
                method: 'POST',
                body: { ...credentials },
            }),
            invalidatesTags: () => [{ type: 'Auth'}],
        }),
    }),
})

export const {
    useLoginMutation,
} = authApi
