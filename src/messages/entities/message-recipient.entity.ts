import { AbstractEntity } from 'src/common/entities/abstract.entity'
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { Message } from './message.entity'

@Entity()
export class MessageRecipient extends AbstractEntity {

    @Column({ default: false })
    isRead: boolean

    @ManyToOne(() => User, (user) => user.inbox)
    recipient: User

    @OneToOne(() => Message)
    @JoinColumn()
    message: Message
}