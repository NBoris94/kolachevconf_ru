import {Injectable, NotFoundException} from '@nestjs/common'
import {Employee} from './employees.model'
import {InjectModel} from '@nestjs/sequelize'
import {FindOptions} from 'sequelize/types/model'
import {NOT_FOUND_EMPLOYEE_ERROR, NOT_FOUND_EMPLOYEES_ERROR} from './employees.constants'
import {CreateEmployeeDto} from './dto/create-employee.dto'
import {UpdateEmployeeDto} from './dto/update-employee.dto'
import {GroupsService} from '../groups/groups.service'
import {SectionsService} from '../sections/sections.service'
import {Op} from 'sequelize'

@Injectable()
export class EmployeesService {

    constructor(
        @InjectModel(Employee)
        private readonly employeeModel: typeof Employee
    ) {}

    async findAll(options?: FindOptions): Promise<Employee[]> {
        return this.employeeModel.findAll(options)
    }

    async findById(id: number): Promise<Employee> {
        const employee = await this.employeeModel.findByPk(id)

        if (!employee) {
            throw new NotFoundException(NOT_FOUND_EMPLOYEE_ERROR)
        }

        return employee
    }

    async create(dto: Partial<CreateEmployeeDto>): Promise<Employee> {
        return this.employeeModel.create(dto)
    }

    async update(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.employeeModel.findByPk(id)

        if (!employee) {
            throw new NotFoundException(NOT_FOUND_EMPLOYEE_ERROR)
        }

        return employee.update({ ...employee, ...dto })
    }

    async delete(id: number) {
        const deletedEmployee = await this.employeeModel.destroy({ where: { id } })

        if (deletedEmployee === 0) {
            throw new NotFoundException(NOT_FOUND_EMPLOYEE_ERROR)
        }
    }
}
