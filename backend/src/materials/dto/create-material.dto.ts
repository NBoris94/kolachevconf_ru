import {IsString} from 'class-validator'

export class CreateMaterialDto {

    @IsString()
    title: string

    @IsString()
    year: string

    @IsString()
    cover?: string

    @IsString()
    file: string
}
