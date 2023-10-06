import {IsArray, IsString} from 'class-validator'

export class UpdateGroupDto {

    @IsString()
    title: string

    @IsArray()
    employeeIds: number[]
}
