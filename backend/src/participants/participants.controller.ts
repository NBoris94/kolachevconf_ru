import {
    Body,
    Controller, Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param, Patch,
    Post, Query,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import {AccessTokenGuard} from '../common/guards/acces-token.guard'
import {ParticipantsService} from './participants.service'
import {CreateParticipantDto} from './dto/create-participant.dto'
import {UpdateParticipantDto} from './dto/update-participant.dto'
import {IParticipantsQuery} from './interfaces/participants.interfaces'

@Controller('participants')
export class ParticipantsController {
    constructor(private readonly participantsService: ParticipantsService) {}

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Get('findAll')
    async findAll(){
        return this.participantsService.findAll()
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async findAllWithFilter(@Query() query: IParticipantsQuery){
        return this.participantsService.findAllWithFilter(query)
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async findById(@Param('id') id: number){
        return this.participantsService.findById(id)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(@Body() dto: CreateParticipantDto) {
        return this.participantsService.create(dto)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() dto: UpdateParticipantDto) {
        return this.participantsService.update(id, dto)
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        return this.participantsService.delete(id)
    }
}
