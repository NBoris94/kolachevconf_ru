import {IsNotEmpty, IsString} from 'class-validator'

export class UpdateFormDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
