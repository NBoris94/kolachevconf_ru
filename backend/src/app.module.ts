import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { SequelizeConfigService } from './common/config/sequelizeConfig.service'
import { databaseConfig } from './common/config/configuration'
import { AuthModule } from './auth/auth.module';
import { SectionsModule } from './sections/sections.module';
import { GroupsModule } from './groups/groups.module';
import { InformationModule } from './information/information.module'
import { MaterialsModule } from './materials/materials.module'
import { ParticipantsModule } from './participants/participants.module'
import { FormsModule } from './forms/forms.module'
import { EmployeesModule } from './employees/employees.module'

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useClass: SequelizeConfigService
        }),
        ConfigModule.forRoot({
            load: [databaseConfig]
        }),
        UsersModule,
        EmployeesModule,
        SectionsModule,
        GroupsModule,
        InformationModule,
        MaterialsModule,
        FormsModule,
        ParticipantsModule,
        AuthModule
    ],
    controllers: [],
})
export class AppModule {}
