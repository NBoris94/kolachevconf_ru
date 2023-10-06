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
import {AccessTokenGuard} from '../common/guards/acces-token.guard'
import {FormsService} from './forms.service'
import {CreateFormDto} from './dto/create-form.dto'
import {UpdateFormDto} from './dto/update-form.dto'

@Controller('forms')
export class FormsController {

    constructor(private readonly formsService: FormsService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll() {
        return this.formsService.findAll()
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async findById(@Param('id') id: number) {
        return this.formsService.findById(id)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(@Body() dto: CreateFormDto) {
        return this.formsService.create(dto)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() dto: UpdateFormDto) {
        return this.formsService.update(id, dto)
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        return this.formsService.delete(id)
    }
}
