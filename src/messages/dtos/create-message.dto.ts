import { IsString } from 'class-validator'

export class CreateMessageDto {
    @IsString()
    subject: string

    @IsString()
    body: string
}