import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Message } from '../messages/message.entity'
import { MessageRecipient } from '../messages/message-recipient.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, type: 'varchar' })
    email: string

    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    lastLoginAt: Date | null

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => Message, (message) => message.author)
    messages: Message[]

    @OneToMany(() => MessageRecipient, (messageRecipient) => messageRecipient.recipient)
    inbox: MessageRecipient[]
}