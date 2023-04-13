import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'
import { User } from './entities/user.entity'
import { Serialize } from '../interceptors/serialize-interceptor'
import { UserDto } from './dtos/user.dto'
import { UsersService } from './services/users.service'
import { CurrentUser } from '../auth/decorators/current-user.decorator'

@Controller('users')
@Serialize(UserDto)
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    whoAmI(@CurrentUser() user: UserDto) {
        return user
    }
}
