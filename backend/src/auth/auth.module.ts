import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenStrategy } from './strategies/access-token.strategy'
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy'
import {ConfigModule} from '@nestjs/config'

@Module({
    imports: [
        UsersModule,
        JwtModule.register({}),
        ConfigModule
    ],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
    exports: [AuthService]
})
export class AuthModule {}
