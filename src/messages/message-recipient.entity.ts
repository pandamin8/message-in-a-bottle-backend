import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { User } from '../users/user.entity'
import { Message } from './message.entity'

@Entity()
export class MessageRecipient {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: false })
    is_read: boolean

    @ManyToOne(() => User, (user) => user.inbox)
    recipient: User

    @OneToOne(() => Message)
    @JoinColumn()
    message: Message
}