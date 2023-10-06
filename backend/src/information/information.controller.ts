import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch, Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import {AccessTokenGuard} from '../common/guards/acces-token.guard'
import {InformationService} from './information.service'
import {InformationDto} from './dto/information.dto'

@Controller('information')
export class InformationController {

    constructor( private readonly informationService: InformationService ) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async findOne() {
        return this.informationService.findOne()
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() dto: InformationDto) {
        return this.informationService.update(id, dto)
    }
}
