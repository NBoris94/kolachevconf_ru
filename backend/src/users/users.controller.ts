import {
    BadRequestException,
    Body,
    Controller, Delete, Get,
    HttpCode,
    HttpStatus, NotFoundException, Param, Patch,
    Post, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import {USER_EXIST_ERROR, USER_NOT_FOUND_ERROR} from './users.constants'
import {UpdateUserDto} from './dto/update-user.dto'
import {AccessTokenGuard} from '../common/guards/acces-token.guard'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(@Body() dto: CreateUserDto) {
        const existUser = await this.usersService.findByEmail(dto.email)

        if (existUser) {
            throw new BadRequestException(USER_EXIST_ERROR)
        }

        return this.usersService.create(dto)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.usersService.update(id, dto)
    }

    @UseGuards(AccessTokenGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.usersService.delete(id)
    }

    @Get('findByEmail/:email')
    async findByEmail(@Param('email') email: string) {
        return this.usersService.findByEmail(email)
    }
}
