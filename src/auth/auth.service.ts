import { BadRequestException, Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthHelper } from './auth.helper';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/user.entity'

@Injectable()
export class AuthService {
    constructor (private usersService: UsersService, private helper: AuthHelper) {}

    public async register(body: CreateUserDto) {
        const { email, password }: CreateUserDto = body

        let user = new User()
        user.email = email
        user.password = this.helper.encodePassword(password)

        user = await this.usersService.create(user)
        const token = this.helper.generateToken(user)

        return { user, token }
    }

    public async login(body: CreateUserDto) {
        const { email, password } = body
        const user: User = await this.usersService.findByEmail(email)

        if (!user)
            throw new HttpException('No user found', HttpStatus.NOT_FOUND)
        
        const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password)

        if (!isPasswordValid)
            throw new HttpException('No user found', HttpStatus.NOT_FOUND)

        const token = this.helper.generateToken(user)

        this.usersService.updateLastLogin(user.id)

        return { user, token }
    }
}
