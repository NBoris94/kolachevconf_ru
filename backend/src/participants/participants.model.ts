import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript'
import {Section} from '../sections/sections.model'
import {Form} from '../forms/forms.model'

@Table
export class Participant extends Model {

    @Column({ allowNull: false })
    title: string

    @Column({ allowNull: false })
    description: string

    @Column({ allowNull: false })
    author: string

    @Column
    secondAuthor?: string

    @Column
    thirdAuthor?: string

    @Column({ allowNull: false })
    status: string

    @Column({ allowNull: false })
    place: string

    @Column({ allowNull: false })
    scientificAdviser: string

    @ForeignKey(() => Section)
    @Column({ allowNull: false })
    sectionId: number

    @BelongsTo(() => Section)
    section: Section

    @ForeignKey(() => Form)
    @Column({ allowNull: false })
    formId: number

    @BelongsTo(() => Form)
    form: Form

    @Column({ allowNull: false })
    phone: string

    @Column({ allowNull: false })
    email: string

    @Column({ allowNull: false })
    file: string
}
