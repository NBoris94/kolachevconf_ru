import { ISection } from "@/interfaces/participants"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface SectionProps extends ISection {
    onDelete: () => void
}

export interface SectionFormState {
    name: string
    employeeIds: number[]
}

export interface SectionFormProps {
    section?: ISection
    isLoading: boolean
    error: FetchBaseQueryError | SerializedError | undefined
    onSubmit: (section: SectionFormState | ISection) => void
}

export interface UpdateSectionProps {
    id: number
}
