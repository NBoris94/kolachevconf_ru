import {Column, HasMany, Model, Table} from 'sequelize-typescript'
import {Participant} from '../participants/participants.model'

@Table
export class Form extends Model {

    @Column({ allowNull: false })
    name: string

    @HasMany(() => Participant)
    participants: Participant[]
}
