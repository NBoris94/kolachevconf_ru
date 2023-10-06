import {IsString} from 'class-validator'
import {Column} from 'sequelize-typescript'

export class InformationDto {

    @IsString()
    title?: string

    @IsString()
    date?: string

    @IsString()
    dateRequests?: string

    @IsString()
    place?: string

    @IsString()
    email?: string

    @IsString()
    contacts?: string

    @IsString()
    common?: string

    @IsString()
    requirements?: string

    @IsString()
    scientificProgram?: string

    @Column
    aboutText?: string

    @Column
    aboutDescription?: string
}
