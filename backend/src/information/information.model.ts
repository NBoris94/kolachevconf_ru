import {Column, Model, Table} from 'sequelize-typescript'

@Table
export class Information extends Model {

    @Column({ allowNull: false })
    title: string

    @Column({ allowNull: false })
    date: string

    @Column({ allowNull: false })
    dateRequests: string

    @Column
    place: string

    @Column
    email: string

    @Column
    contacts: string

    @Column
    common: string

    @Column
    requirements: string

    @Column
    scientificProgram: string

    @Column
    aboutText: string

    @Column
    aboutDescription: string
}
