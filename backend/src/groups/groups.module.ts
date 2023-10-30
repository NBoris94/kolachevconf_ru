import { Module } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { GroupsController } from './groups.controller'
import {SequelizeModule} from '@nestjs/sequelize'
import {Group} from './groups.model'
import {EmployeesModule} from '../employees/employees.module'
import { EmployeeGroup } from 'src/common/models/employee-group.model'

@Module({
    imports: [
        SequelizeModule.forFeature([Group, EmployeeGroup]),
        EmployeesModule
    ],
    providers: [GroupsService],
    controllers: [GroupsController]
})
export class GroupsModule {}
