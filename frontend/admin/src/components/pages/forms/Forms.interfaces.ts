import { IForm } from "@/interfaces/participants"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface FormProps extends IForm {
    onDelete: () => void
}

export interface FormFormState {
    name: string
}

export interface FormFormProps {
    form?: FormFormState | IForm
    isLoading: boolean
    error: FetchBaseQueryError | SerializedError | undefined
    onSubmit: (form: FormFormState | IForm) => void
}

export interface UpdateFormProps {
    id: number
}
