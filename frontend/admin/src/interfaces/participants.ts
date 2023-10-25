import { IEmployee } from "./employees"

export interface IParticipant {
    id: number
    title: string
    description: string
    author: string
    secondAuthor: string
    thirdAuthor: string
    status: string
    place: string
    scientificAdviser: string
    sectionId: number
    formId: number
    phone: string
    email: string
    file: string
    reqStatus: IStatus
    createdAt: string
    updatedAt: string
    form: IForm,
    section: ISection
}

export interface IForm {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export interface ISection {
    id: number
    name: string
    employees: IEmployee[]
    createdAt: string
    updatedAt: string
}

export type IStatus = 'new' | 'accepted' | 'rejected'
