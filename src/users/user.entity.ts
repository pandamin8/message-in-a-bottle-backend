import { AbstractEntity } from 'src/common/entities/abstract.entity'
import { Entity, Column, OneToMany } from 'typeorm'
import { Message } from '../messages/message.entity'
import { MessageRecipient } from '../messages/message-recipient.entity'

@Entity()
export class User extends AbstractEntity {

    @Column({ unique: true, type: 'varchar' })
    email: string

    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    lastLoginAt: Date | null

    @OneToMany(() => Message, (message) => message.author)
    messages: Message[]

    @OneToMany(() => MessageRecipient, (messageRecipient) => messageRecipient.recipient)
    inbox: MessageRecipient[]
}