import { api } from './api'
import {ISection} from '@/interfaces/participants'

type SectionsResponse = ISection[]

export const sectionsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSections: build.query<SectionsResponse, void>({
            query: () => ( {url: '/sections',} ),
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Sections', id } as const)),
                { type: 'Sections' as const, id: 'LIST' },
            ],
        }),

        getSection: build.query<ISection, number>({
            query: (id) => `sections/${id}`,
            providesTags: (_section, _err, id) => [{ type: 'Sections', id }],
        }),

        addSection: build.mutation<ISection, Partial<ISection>>({
            query: (body) => ({
                url: `/sections/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Sections', id: 'LIST' }],
        }),

        updateSection: build.mutation<ISection, Partial<ISection>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `/sections/update/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: (section) => [{ type: 'Sections', id: section?.id }],
        }),

        deleteSection: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `/sections/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (section) => [{ type: 'Sections', id: section?.id }],
        }),
    }),
})

export const {
    useGetSectionQuery,
    useGetSectionsQuery,
    useAddSectionMutation,
    useUpdateSectionMutation,
    useDeleteSectionMutation,
} = sectionsApi
