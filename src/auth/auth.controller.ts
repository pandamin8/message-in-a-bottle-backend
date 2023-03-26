import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dtos/create-user.dto'
import { JwtAuthGuard } from './auth.guard'
import { AuthHelper } from './auth.helper'

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private helper: AuthHelper) {}

    @Post('signup')
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.authService.register(body)
        return user
    }

    @Post('login')
    async loginUser(@Body() body: CreateUserDto) {
        const result = await this.authService.login(body)
        return result
    }
}
