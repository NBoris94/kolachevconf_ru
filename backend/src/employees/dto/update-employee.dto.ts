import {IsArray, IsString} from 'class-validator'

export class UpdateEmployeeDto {

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsString()
    patronymic: string

    @IsString()
    post: string
}
