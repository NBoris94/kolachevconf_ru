import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {Group} from './groups.model'
import {EmployeeGroup} from '../common/models/employee-group.model'
import {CreateGroupDto} from './dto/create-group.dto'
import {UpdateGroupDto} from './dto/update-group.dto'
import {NOT_FOUND_GROUP_ERROR} from './groups.constants'
import {Op} from 'sequelize'
import {Employee} from '../employees/employees.model'
import {FindOptions} from 'sequelize/types/model'
import {EmployeesService} from '../employees/employees.service'
import {NOT_FOUND_EMPLOYEES_ERROR} from '../employees/employees.constants'

@Injectable()
export class GroupsService {

    constructor(
        @InjectModel(Group)
        private readonly groupModel: typeof Group,

        @InjectModel(EmployeeGroup)
        private readonly employeeGroupModel: typeof EmployeeGroup,

        private readonly employeesService: EmployeesService
    ) {}

    async findAll(options?: FindOptions): Promise<Group[]> {
        return this.groupModel.findAll({ ...options, include: [Employee] })
    }

    async findById(id: number) {
        return this.groupModel.findByPk(id, { include: [Employee] })
    }

    async create(dto: CreateGroupDto) {
        const { employeeIds, ...rest } = dto
        const employees = await this.employeesService.findAll({ where: { id: { [Op.in]: employeeIds } } })

        if (employees.length === 0) {
            throw new NotFoundException(NOT_FOUND_EMPLOYEES_ERROR)
        }

        const group = await this.groupModel.create(rest)
        await group.$set('employees', employees)

        return group
    }

    async update(id: number, dto: UpdateGroupDto) {
        const { employeeIds, ...rest } = dto
        const employees = await this.employeesService.findAll({ where: { id: { [Op.in]: employeeIds } } })

        const [affectedRows] = await this.groupModel.update(rest, { where: { id } })

        if (affectedRows === 0) {
            throw new NotFoundException(NOT_FOUND_GROUP_ERROR)
        }

        const updatedGroup = await this.groupModel.findByPk(id)
        await updatedGroup.$set('employees', employees)

        return updatedGroup
    }

    async delete(id: number) {
        const deleteEmployeeGroups = await this.employeeGroupModel.destroy({ where: { groupId: id } })
        const deletedGroup = await this.groupModel.destroy({ where: { id } })

        if (deletedGroup === 0) {
            throw new NotFoundException(NOT_FOUND_GROUP_ERROR)
        }
    }
}
