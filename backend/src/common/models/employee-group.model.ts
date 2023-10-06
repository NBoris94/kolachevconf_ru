import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript'
import {Group} from '../../groups/groups.model'
import {Employee} from '../../employees/employees.model'

@Table
export class EmployeeGroup extends Model {

    @ForeignKey(() => Employee)
    @Column
    employeeId: number

    @BelongsTo(() => Employee)
    employee: Employee

    @ForeignKey(() => Group)
    @Column
    groupId: number

    @BelongsTo(() => Group)
    group: Group
}
