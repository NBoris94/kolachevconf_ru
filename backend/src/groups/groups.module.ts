import { Module } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { GroupsController } from './groups.controller'
import {SequelizeModule} from '@nestjs/sequelize'
import {Group} from './groups.model'
import {EmployeesModule} from '../employees/employees.module'

@Module({
    imports: [
        SequelizeModule.forFeature([Group]),
        EmployeesModule
    ],
    providers: [GroupsService],
    controllers: [GroupsController]
})
export class GroupsModule {}
