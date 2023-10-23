import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req, Res,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthDto} from './dto/auth.dto'
import {User} from '../users/users.model'
import {Request, Response} from 'express'
import {AccessTokenGuard} from '../common/guards/acces-token.guard'
import {RefreshTokenGuard} from '../common/guards/refresh-token.guard'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() { email, password }: AuthDto) {
        const user: User = await this.authService.validateUser(email, password)

        return this.authService.login(user)
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: Request) {
        return this.authService.logout(req.user['sub']);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(@Req() req: Request) {
        const id = req.user['sub']
        const refreshToken = req.user['refreshToken']
        return this.authService.refreshTokens(id, refreshToken)
    }
}
