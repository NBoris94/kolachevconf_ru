import {IParticipant, IStatus} from '@/interfaces/participants'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {SerializedError} from '@reduxjs/toolkit'

export interface ParticipantFormState {
    id?: number
    title: string
    author: string
    secondAuthor?: string
    thirdAuthor?: string
    description?: string
    scientificAdviser: string
    status: string
    place: string
    sectionId: number
    formId: number
    phone: string
    email: string
    file: string
    reqStatus: IStatus
}

export interface ParticipantFormProps {
    participant?: IParticipant
    isLoading: boolean
    error: FetchBaseQueryError | SerializedError | undefined
    onSubmit: (participant: ParticipantFormState | IParticipant) => void
}

export interface UpdateParticipantProps {
    id: number
}

