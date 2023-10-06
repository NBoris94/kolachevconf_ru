import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import {SequelizeModule} from '@nestjs/sequelize'
import {EmployeeGroup} from '../common/models/employee-group.model'
import {EmployeeSection} from '../common/models/employee-section.model'
import {Employee} from './employees.model'
import {GroupsModule} from '../groups/groups.module'
import {SectionsModule} from '../sections/sections.module'

@Module({
    imports: [
        SequelizeModule.forFeature([Employee, EmployeeGroup, EmployeeSection])
    ],
    providers: [EmployeesService],
    controllers: [EmployeesController],
    exports: [EmployeesService]
})
export class EmployeesModule {}
