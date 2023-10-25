import {BelongsToMany, Column, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript'
import {EmployeeSection} from '../common/models/employee-section.model'
import {Participant} from '../participants/participants.model'
import {Employee} from '../employees/employees.model'

@Table
export class Section extends Model {

    @Column({ allowNull: false })
    name: string

    @BelongsToMany(() => Employee, () => EmployeeSection)
    employees: Employee[]

    @HasMany(() => Participant)
    participants: Participant[]
}
