import {
    Body,
    Controller, Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param, Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import {EmployeesService} from './employees.service'
import {CreateEmployeeDto} from './dto/create-employee.dto'
import {AccessTokenGuard} from '../common/guards/acces-token.guard'

@Controller('employees')
export class EmployeesController {

    constructor(private readonly employeesService: EmployeesService ) {}

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll() {
        return this.employeesService.findAll()
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async findById(@Param('id') id: number) {
        return this.employeesService.findById(id)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(@Body() dto: CreateEmployeeDto) {
        return this.employeesService.create(dto)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() dto: CreateEmployeeDto) {
        return this.employeesService.update(id, dto)
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        return this.employeesService.delete(id)
    }
}
