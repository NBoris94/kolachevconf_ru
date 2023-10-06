import {Column, ForeignKey, Model, Table} from 'sequelize-typescript'
import {Section} from '../../sections/sections.model'
import {Employee} from '../../employees/employees.model'

@Table
export class EmployeeSection extends Model {

    @ForeignKey(() => Employee)
    @Column
    employeeId: number;

    @ForeignKey(() => Section)
    @Column
    sectionId: number;
}
