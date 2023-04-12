import { Entity, OneToMany, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { AbstractEntity } from 'src/common/entities/abstract.entity'

import { MessageRecipient } from './message-recipient.entity'
import { User } from 'src/users/entities/user.entity'

@Entity()
export class Report extends AbstractEntity {

    @OneToOne(() => MessageRecipient)
    @JoinColumn()
    reportedMessage: MessageRecipient

    @ManyToOne(() => User, (user) => user.reported)
    reporter: User

    @Column()
    description: string
}