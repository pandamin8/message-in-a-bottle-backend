import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dtos/create-user.dto'
import { JwtAuthGuard } from './auth.guard'
import { AuthHelper } from './auth.helper'
import { Serialize } from 'src/interceptors/serialize-interceptor'
import { UserAuthDto } from '../users/dtos/user-auth.dto'

@Controller('auth')
@Serialize(UserAuthDto)
export class AuthController {

    constructor(private authService: AuthService, private helper: AuthHelper) {}

    @Post('signup')
    async createUser(@Body() body: CreateUserDto) {
        const result = await this.authService.register(body)
        console.log(result)
        return result
    }

    @Post('login')
    async loginUser(@Body() body: CreateUserDto) {
        const result = await this.authService.login(body)
        console.log(result)
        return result
    }
}
