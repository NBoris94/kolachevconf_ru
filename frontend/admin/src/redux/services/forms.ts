import { api } from './api'
import { IForm } from '@/interfaces/participants'

type FormsResponse = IForm[]

export const formsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getForms: build.query<FormsResponse, void>({
            query: () => ( {url: '/forms',} ),
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Forms', id } as const)),
                { type: 'Forms' as const, id: 'LIST' },
            ],
        }),

        getForm: build.query<IForm, number>({
            query: (id) => `/forms/${id}`,
            providesTags: (_form, _err, id) => [{ type: 'Forms', id }],
        }),

        addForm: build.mutation<IForm, Partial<IForm>>({
            query: (body) => ({
                url: `/forms/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Forms', id: 'LIST' }],
        }),

        updateForm: build.mutation<IForm, Partial<IForm>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `/forms/update/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: (form) => [{ type: 'Forms', id: form?.id }],
        }),

        deleteForm: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `/forms/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (form) => [{ type: 'Forms', id: form?.id }],
        }),
    }),
})

export const {
    useGetFormQuery,
    useGetFormsQuery,
    useAddFormMutation,
    useUpdateFormMutation,
    useDeleteFormMutation,
} = formsApi
