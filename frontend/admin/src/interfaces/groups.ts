import { IEmployee } from "./employees"

export interface IGroup {
    id: number
    title: string
    employees: IEmployee[]
    createdAt: string
    updatedAt: string
}
