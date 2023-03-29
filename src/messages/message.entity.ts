import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    subject: string

    @Column()
    body: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => User, (user) => user.messages)
    author: User
}