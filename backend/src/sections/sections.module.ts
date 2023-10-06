import { Module } from '@nestjs/common'
import { SectionsController } from './sections.controller'
import { SectionsService } from './sections.service'
import {SequelizeModule} from '@nestjs/sequelize'
import {Section} from './sections.model'
import {EmployeesModule} from '../employees/employees.module'

@Module({
    imports: [
        SequelizeModule.forFeature([Section]),
        EmployeesModule
    ],
    controllers: [SectionsController],
    providers: [SectionsService]
})
export class SectionsModule {}
