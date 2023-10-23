import {IsString, IsEmail} from 'class-validator'

export class AuthDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string
}
