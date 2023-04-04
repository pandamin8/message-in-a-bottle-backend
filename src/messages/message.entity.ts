import { AbstractEntity } from 'src/common/entities/abstract.entity'
import { Entity, Column, ManyToOne } from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Message extends AbstractEntity {

    @Column()
    subject: string

    @Column()
    body: string

    @ManyToOne(() => User, (user) => user.messages)
    author: User
}