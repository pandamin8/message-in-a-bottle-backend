import { Expose } from 'class-transformer'

export class UserDto {
    @Expose()
    id: number

    @Expose()
    email: string

    @Expose()
    lastLoginAt: Date

    @Expose()
    created_at: Date
}