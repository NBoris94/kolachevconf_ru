import {IsNotEmpty, IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class CreateUserDto {

    @ApiProperty({ example: 'Борис' })
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @ApiProperty({ example: 'test@mail.ru' })
    @IsNotEmpty()
    @IsString()
    readonly email: string

    @ApiProperty({ example: 'AzabcZ33_!' })
    @IsNotEmpty()
    @IsString()
    readonly password: string

    @ApiProperty({ example: '' })
    @IsString()
    refreshToken?: string
}
