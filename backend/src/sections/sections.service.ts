import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {Section} from './sections.model'
import {EmployeeSection} from '../common/models/employee-section.model'
import {CreateSectionDto} from './dto/create-section.dto'
import {UpdateSectionDto} from './dto/update-section.dto'
import {SECTION_NOT_FOUND_ERROR} from './sections.constants'
import {Op} from 'sequelize'
import {EmployeesService} from '../employees/employees.service'
import {FindOptions} from 'sequelize/types/model'
import {Employee} from '../employees/employees.model'

@Injectable()
export class SectionsService {

    constructor(
       @InjectModel(Section)
       private readonly sectionModel: typeof Section,

       @InjectModel(EmployeeSection)
       private readonly employeeSectionModel: typeof EmployeeSection,

       private readonly employeeService: EmployeesService
    ) {}

    async findAll(options?: FindOptions): Promise<Section[]> {
        return this.sectionModel.findAll({ ...options, include: [Employee], order: [['name', 'ASC']] })
    }

    async findById(id: number): Promise<Section> {
        return this.sectionModel.findByPk(id, { include: [Employee] })
    }

    async create(dto: CreateSectionDto): Promise<Section> {
        const { employeeIds, ...rest } = dto
        const employees = await this.employeeService.findAll({ where: { id: { [Op.in]: employeeIds } } })

        const section = await this.sectionModel.create(rest)
        await section.$set('employees', employees)

        return section
    }

    async update(id: number, dto: UpdateSectionDto): Promise<Section> {
        const { employeeIds, ...rest } = dto
        const employees = await this.employeeService.findAll({ where: { id: { [Op.in]: employeeIds } } })

        const [affectedRows] = await this.sectionModel.update(rest, { where: { id } })

        if (affectedRows === 0) {
            throw new NotFoundException(SECTION_NOT_FOUND_ERROR)
        }

        const updatedSection = await this.sectionModel.findByPk(id)
        await updatedSection.$set('employees', employees)

        return updatedSection
    }

    async delete(id: number) {
        const deleteEmployeeSections = await this.employeeSectionModel.destroy({ where: { sectionId: id } })
        const deletedSection = await this.sectionModel.destroy({ where: { id } })

        if (deletedSection === 0) {
            throw new NotFoundException(SECTION_NOT_FOUND_ERROR)
        }
    }
}
