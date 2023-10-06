import {IsNotEmpty, IsString} from 'class-validator'

export class CreateFormDto {
    
    @IsNotEmpty()
    @IsString()
    name: string
}
