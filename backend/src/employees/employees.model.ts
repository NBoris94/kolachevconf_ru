import {BelongsToMany, Column, Model, Table} from 'sequelize-typescript'
import {Group} from '../groups/groups.model'
import {EmployeeGroup} from '../common/models/employee-group.model'
import {Section} from '../sections/sections.model'
import {EmployeeSection} from '../common/models/employee-section.model'

@Table
export class Employee extends Model {
    
    @Column({ allowNull: false })
    name: string

    @Column({ allowNull: false })
    surname: string

    @Column({ allowNull: false })
    patronymic: string

    @Column({ allowNull: false })
    post: string

    @BelongsToMany(() => Group, () => EmployeeGroup)
    groups: Group[]

    @BelongsToMany(() => Section, () => EmployeeSection)
    sections: Section[]
}
