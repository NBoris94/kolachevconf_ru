import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from './users.model'
import {SequelizeModule} from '@nestjs/sequelize'
import {JwtModule} from '@nestjs/jwt'
import {ConfigModule} from '@nestjs/config'
import {AuthModule} from '../auth/auth.module'

@Module({
    imports: [
        SequelizeModule.forFeature([User])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
