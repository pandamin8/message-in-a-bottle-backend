import { BadRequestException, Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthHelper } from './auth.helper';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/user.entity'

@Injectable()
export class AuthService {
    constructor (private usersService: UsersService, private helper: AuthHelper) {}

    // @Inject(AuthHelper)
    // private readonly helper: AuthHelper

    public async register(body: CreateUserDto) {
        const { email, password }: CreateUserDto = body

        const user = new User()
        user.email = email
        user.password = this.helper.encodePassword(password)

        await this.usersService.create(user)
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

        this.usersService.update(user.id, { lastLoginAt: new Date() })

        return { user, token }
    }

    // async signup(email: string, password: string) {
    //     const salt = randomBytes(8).toString('hex')
    //     const hash = (await scrypt(password, salt, 32)) as Buffer
    //     const result = salt + '.' + hash.toString('hex')

    //     const user = await this.usersService.create(email, result)

    //     const payload = { email: user.email, sub: user.id }
    //     const token = this.jwtTokenService.sign(payload)
    //     console.log(token)
    //     return { user, access_token: token }
    // }
}
