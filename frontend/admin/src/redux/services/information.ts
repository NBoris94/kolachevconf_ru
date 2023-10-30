import { api } from './api'
import { IInformation } from '@/interfaces/information'

export const informationApi = api.injectEndpoints({
    endpoints: (build) => ({

        getInformation: build.query<IInformation, void>({
            query: () => `/information`,
            providesTags: (_form, _err) => [{ type: 'Information', id: 'INFORMATION' }],
        }),

        updateInformation: build.mutation<IInformation, Partial<IInformation>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `/information/update/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: () => [{ type: 'Information', id: 'INFORMATION' }],
        }),
    }),
})

export const {
    useGetInformationQuery,
    useUpdateInformationMutation,
} = informationApi
