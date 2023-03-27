import { IsEmail, IsString } from 'class-validator'
import { Trim } from 'class-sanitizer'

export class CreateUserDto {
    @Trim()
    @IsEmail()
    email: string

    @Trim()
    @IsString()
    password: string
}