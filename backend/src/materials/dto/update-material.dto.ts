import {IsString} from 'class-validator'

export class UpdateMaterialDto {

    @IsString()
    title: string

    @IsString()
    year: string

    @IsString()
    cover: string

    @IsString()
    file: string
}
