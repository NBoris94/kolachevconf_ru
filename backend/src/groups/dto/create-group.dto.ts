import {IsArray, IsString} from 'class-validator'

export class CreateGroupDto {

    @IsString()
    title: string

    @IsArray()
    employeeIds: number[]
}
