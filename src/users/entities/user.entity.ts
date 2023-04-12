import { AbstractEntity } from 'src/common/entities/abstract.entity'
import { Entity, Column, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer'

import { Message } from 'src/messages/entities/message.entity'
import { MessageRecipient } from 'src/messages/entities/message-recipient.entity'
import { Report } from 'src/messages/entities/report.entity'

@Entity()
export class User extends AbstractEntity {

    @Column({ unique: true, type: 'varchar' })
    email: string

    @Exclude()
    @Column({ type: 'varchar', select: false })
    password: string

    @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    lastLoginAt: Date | null

    @OneToMany(() => Message, (message) => message.author)
    messages: Message[]

    @OneToMany(() => MessageRecipient, (messageRecipient) => messageRecipient.recipient)
    inbox: MessageRecipient[]

    @OneToMany(() => Report, (messageRecipientReport) => messageRecipientReport.reporter)
    reported: Report[]
}