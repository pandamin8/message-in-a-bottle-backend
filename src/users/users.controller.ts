import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'
import { User } from './user.entity'

@Controller('users')
export class UsersController {
    @Get('me')
    @UseGuards(JwtAuthGuard)
    whoAmI(@Request() req: any) {
        const user = req.user as User
        return user
    }
}
