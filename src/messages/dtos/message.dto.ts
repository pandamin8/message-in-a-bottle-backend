import { Expose } from 'class-transformer'

export class MessageDto {

    @Expose()
    id: number

    @Expose()
    subject: string

    @Expose()
    body: string

    @Expose()
    created_at: Date
}