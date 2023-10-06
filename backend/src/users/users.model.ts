import {Column, Model, Table, Unique} from 'sequelize-typescript'

@Table
export class User extends Model {

    @Column({ allowNull: false })
    name: string

    @Column({ allowNull: false, unique: true })
    email: string

    @Column({ allowNull: false })
    password: string

    @Column
    refreshToken: string
}
