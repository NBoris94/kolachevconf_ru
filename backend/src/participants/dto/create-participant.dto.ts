import {IsNumber, IsString} from 'class-validator'

export class CreateParticipantDto {

    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    author: string

    @IsString()
    secondAuthor?: string

    @IsString()
    thirdAuthor?: string

    @IsString()
    status: string

    @IsString()
    place: string

    @IsString()
    scientificAdviser: string

    @IsNumber()
    sectionId: number

    @IsNumber()
    formId: number

    @IsString()
    phone: string

    @IsString()
    email: string

    @IsString()
    file: string
}
