import { api } from './api'
import {IParticipant} from '@/interfaces/participants'

interface ParticipantsResponse {
    count: number
    rows: IParticipant[]
}

const PARTICIPANTS_INITIAL_STATE: ParticipantsResponse = {
    count: 0,
    rows: [] as IParticipant[]
}

interface ParticipantsQuery {
    limit?: number
    offset?: number
    search?: string
    sectionId?: number
    sort?: string
    orderBy?: 'ASC' | 'DESC'
    accessToken?: string
}

export const participantsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getParticipants: build.query<ParticipantsResponse, ParticipantsQuery>({
            query: (
                {
                    limit = 10,
                    offset = 0,
                    search = '',
                    sectionId,
                    sort = 'createdAt',
                    orderBy = 'DESC',
                }
            ) => (
                {
                    url: '/participants',
                    params: {
                        limit,
                        offset,
                        search,
                        sectionId,
                        sort,
                        orderBy
                    }
                }
            ),
            providesTags: (result = PARTICIPANTS_INITIAL_STATE) => [
                ...result.rows.map(({ id }) => ({ type: 'Participants', id } as const)),
                { type: 'Participants' as const, id: 'LIST' },
            ],
        }),

        getParticipant: build.query<IParticipant, number>({
            query: (id) => `/participants/${id}`,
            providesTags: (_participant, _err, id) => [{ type: 'Participants', id }],
        }),

        addParticipant: build.mutation<IParticipant, Partial<IParticipant>>({
            query: (body) => ({
                url: `participants/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Participants', id: 'LIST' }],
        }),

        updateParticipant: build.mutation<IParticipant, Partial<IParticipant>>({
            query(data) {
                const { id, ...body } = data

                return {
                    url: `/participants/update/${id}`,
                    method: 'PATCH',
                    headers: [
                        ['Authorization', `Bearer 123`]
                    ],
                    body,
                }
            },
            invalidatesTags: (participant) => [{ type: 'Participants', id: participant?.id }],
        }),

        deleteParticipant: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `/participants/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (participant) => [{ type: 'Participants', id: participant?.id }],
        }),
    }),
})

export const {
    useGetParticipantQuery,
    useGetParticipantsQuery,
    useAddParticipantMutation,
    useUpdateParticipantMutation,
    useDeleteParticipantMutation,
} = participantsApi
