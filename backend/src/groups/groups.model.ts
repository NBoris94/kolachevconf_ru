import {BelongsToMany, Column, Model, Table} from 'sequelize-typescript'
import {EmployeeGroup} from '../common/models/employee-group.model'
import {Employee} from '../employees/employees.model'

@Table
export class Group extends Model {

    @Column
    title: string

    @BelongsToMany(() => Employee, () => EmployeeGroup)
    employees: Employee[]
}
