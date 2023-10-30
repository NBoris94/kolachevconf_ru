import { IGroup } from '@/interfaces/groups'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface GroupProps extends IGroup {
    onDelete: () => void
}

export interface GroupFormState {
    title: string
    employeeIds: number[]
}

export interface GroupFormProps {
    group?: IGroup
    isLoading: boolean
    error: FetchBaseQueryError | SerializedError | undefined
    onSubmit: (group: GroupFormState | IGroup) => void
}

export interface UpdateGroupProps {
    id: number
}
