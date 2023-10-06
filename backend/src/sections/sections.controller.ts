import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode, HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import {CreateSectionDto} from './dto/create-section.dto'
import {UpdateSectionDto} from './dto/update-section.dto'
import {AccessTokenGuard} from '../common/guards/acces-token.guard'
import {SectionsService} from './sections.service'

@Controller('sections')
export class SectionsController {

    constructor(private readonly sectionsService: SectionsService ) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll() {
        return this.sectionsService.findAll()
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async findById(@Param('id') id: number) {
        return this.sectionsService.findById(id)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(@Body() dto: CreateSectionDto) {
        return this.sectionsService.create(dto)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() dto: UpdateSectionDto) {
        return this.sectionsService.update(id, dto)
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        return this.sectionsService.delete(id)
    }
}
