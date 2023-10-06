import {IsString} from 'class-validator'

export class CreateEmployeeDto {

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsString()
    patronymic: string

    @IsString()
    post: string
}
