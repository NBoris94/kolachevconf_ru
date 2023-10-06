import {Column, Model, Table} from 'sequelize-typescript'

@Table
export class Material extends Model {

    @Column({ allowNull: false })
    title: string

    @Column({ allowNull: false })
    year: string

    @Column
    cover: string

    @Column
    file: string
}
