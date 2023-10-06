import {
    Body,
    Controller, Delete,
    Get,
    HttpCode,
    HttpStatus, Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import {MaterialsService} from './materials.service'
import {AccessTokenGuard} from '../common/guards/acces-token.guard'
import {CreateMaterialDto} from './dto/create-material.dto'
import {UpdateMaterialDto} from './dto/update-material.dto'

@Controller('materials')
export class MaterialsController {

    constructor( private readonly materialsService: MaterialsService ) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll() {
        return this.materialsService.findAll()
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(@Body() dto: CreateMaterialDto) {
        return this.materialsService.create(dto)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() dto: UpdateMaterialDto) {
        return this.materialsService.update(id, dto)
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        return this.materialsService.delete(id)
    }
}
