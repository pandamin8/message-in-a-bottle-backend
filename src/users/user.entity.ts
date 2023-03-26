import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, type: 'varchar' })
    email: string

    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'timestamp', nullable: true, default: new Date() })
    lastLoginAt: Date | null
}