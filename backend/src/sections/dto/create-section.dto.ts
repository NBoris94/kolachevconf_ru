import {IsArray, IsNotEmpty, IsString} from 'class-validator'

export class CreateSectionDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsArray()
    employeeIds: number[]
}
