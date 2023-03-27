import { IsEmail, IsObject, IsString, ValidateNested, isObject } from 'class-validator'
import { Type, Expose } from 'class-transformer'
import { UserDto } from './user.dto'


export class UserAuthDto {

    @Expose()
    @Type(() => UserDto)
    @ValidateNested()
    user: UserDto

    @Expose()
    @IsString()
    token: String
}