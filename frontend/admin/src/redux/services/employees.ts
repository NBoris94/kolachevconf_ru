import { api } from './api'
import { IEmployee } from '@/interfaces/employees'

type EmployeesResponse = IEmployee[]

export const employeesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getEmployees: build.query<EmployeesResponse, void>({
            query: () => ( {url: '/employees',} ),
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Employees', id } as const)),
                { type: 'Employees' as const, id: 'LIST' },
            ],
        }),

        getEmployee: build.query<IEmployee, number>({
            query: (id) => `/employees/${id}`,
            providesTags: (_employee, _err, id) => [{ type: 'Employees', id }],
        }),

        addEmployee: build.mutation<IEmployee, Partial<IEmployee>>({
            query: (body) => ({
                url: `/employees/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Employees', id: 'LIST' }],
        }),

        updateEmployee: build.mutation<IEmployee, Partial<IEmployee>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `/employees/update/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: (employee) => [{ type: 'Employees', id: employee?.id }],
        }),

        deleteEmployee: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `/employees/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (employee) => [{ type: 'Employees', id: employee?.id }],
        }),
    }),
})

export const {
    useGetEmployeeQuery,
    useGetEmployeesQuery,
    useAddEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeesApi
