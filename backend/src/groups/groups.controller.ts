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
import {GroupsService} from './groups.service'
import {AccessTokenGuard} from '../common/guards/acces-token.guard'
import {CreateGroupDto} from './dto/create-group.dto'
import {UpdateGroupDto} from './dto/update-group.dto'

@Controller('groups')
export class GroupsController {

    constructor(private readonly groupService: GroupsService ) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll() {
        return this.groupService.findAll()
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async findById(@Param('id') id: number) {
        return this.groupService.findById(id)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(@Body() dto: CreateGroupDto) {
        return this.groupService.create(dto)
    }

    @UseGuards(AccessTokenGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() dto: UpdateGroupDto) {
        return this.groupService.update(id, dto)
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        return this.groupService.delete(id)
    }
}
