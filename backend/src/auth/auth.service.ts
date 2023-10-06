import {ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common'
import {UsersService} from '../users/users.service'
import {USER_ACCESS_DENIED_ERROR, USER_NOT_FOUND_ERROR, USER_PASSWORD_ERROR} from './auth.constants'
import {compare, hash} from 'bcrypt'
import {JwtService} from '@nestjs/jwt'
import {ConfigService} from '@nestjs/config'
import {CreateUserDto} from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async getTokens(id: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ sub: id, email }, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn: '15m'
            }),
            this.jwtService.signAsync({ sub: id, email }, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '7d'
            })
        ])

        return { accessToken, refreshToken }
    }

    async updateRefreshToken(id: number, refreshToken: string) {
        const hashedRefreshToken = await hash(refreshToken, 10)
        await this.usersService.update(id, {
            refreshToken: hashedRefreshToken,
        } as CreateUserDto)
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
        }

        const isCorrectPassword = await compare(password, user.password)

        if (!isCorrectPassword) {
            throw new UnauthorizedException(USER_PASSWORD_ERROR)
        }

        return { id: user.id, email: user.email }
    }

    async refreshTokens(id: number, refreshToken: string) {
        const user = await this.usersService.findById(id)

        if (!user || !user.refreshToken) {
            throw new ForbiddenException(USER_ACCESS_DENIED_ERROR)
        }

        const refreshTokenMatches = await compare(refreshToken, user.refreshToken)

        if (!refreshTokenMatches) {
            throw new ForbiddenException(USER_ACCESS_DENIED_ERROR)
        }

        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRefreshToken(user.id, tokens.refreshToken)
        return tokens
    }

    async login(id: number, email: string) {
        const tokens = await this.getTokens(id, email)
        await this.updateRefreshToken(id, tokens.refreshToken)
        return tokens
    }

    async logout(id: number) {
        return this.usersService.update(id, { refreshToken: null } as CreateUserDto)
    }
}
