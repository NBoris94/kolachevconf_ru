import { IEmployee } from "@/interfaces/employees"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface EmployeeProps extends IEmployee {
    onDelete: () => void
}

export interface EmployeeFormState {
    name: string
    surname: string
    patronymic: string
    post: string
}

export interface EmployeeFormProps {
    employee?: EmployeeFormState | IEmployee
    isLoading: boolean
    error: FetchBaseQueryError | SerializedError | undefined
    onSubmit: (employee: EmployeeFormState | IEmployee) => void
}

export interface UpdateEmployeeProps {
    id: number
}
