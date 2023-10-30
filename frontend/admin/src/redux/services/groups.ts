import { api } from './api'
import { IGroup } from '@/interfaces/groups'

type GroupsResponse = IGroup[]

export const groupsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getGroups: build.query<GroupsResponse, void>({
            query: () => ( {url: '/groups',} ),
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Groups', id } as const)),
                { type: 'Groups' as const, id: 'LIST' },
            ],
        }),

        getGroup: build.query<IGroup, number>({
            query: (id) => `/groups/${id}`,
            providesTags: (_group, _err, id) => [{ type: 'Groups', id }],
        }),

        addGroup: build.mutation<IGroup, Partial<IGroup>>({
            query: (body) => ({
                url: `/groups/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Groups', id: 'LIST' }],
        }),

        updateGroup: build.mutation<IGroup, Partial<IGroup>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `/groups/update/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: (group) => [{ type: 'Groups', id: group?.id }],
        }),

        deleteGroup: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `/groups/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (group) => [{ type: 'Groups', id: group?.id }],
        }),
    }),
})

export const {
    useGetGroupQuery,
    useGetGroupsQuery,
    useAddGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,
} = groupsApi
