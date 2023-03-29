import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'
import { User } from './user.entity'
import { Serialize } from '../interceptors/serialize-interceptor'
import { UserDto } from './dtos/user.dto'
import { UsersService } from './users.service'

@Controller('users')
@Serialize(UserDto)
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    whoAmI(@Request() req: any) {
        const user = req.user as User
        return user
    }
}
