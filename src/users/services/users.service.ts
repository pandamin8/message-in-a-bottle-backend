import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private repo: Repository<User>) {}

    async create(creatingUser: CreateUserDto) {
        const { email, password } = creatingUser
        const userExists = await this.findByEmail(email)
        if (userExists) throw new BadRequestException('Email is in use')

        const user = this.repo.create({ email, password })
        await this.repo.save(user)

        return user
    }

    findByEmail(email: string, exclusive: boolean = true) {
        if (exclusive)
            return this.repo.findOneBy({ email })

        return this.repo.findOne({ select: this.getCols(), where: { email } })
    }

    findOne (id: number) {
        if (!id) return null
        return this.repo.findOneBy({ id })
    }

    async update (id: number, attrs: Partial<CreateUserDto>) {
        const user = await this.findOne(id)

        if (!user) throw new NotFoundException('User not found')

        Object.assign(user, attrs)

        return this.repo.save(user)
    }

    async updateLastLogin(id: number) {
        const user = await this.findOne(id)
        
        if (!user) throw new NotFoundException('User not found')

        Object.assign(user, { lastLoginAt: new Date() })

        return this.repo.save(user)
    }

    async delete (id: number) {
        const user = await this.findOne(id)

        if (!user) throw new NotFoundException('User not found')

        return this.repo.remove(user)
    }

    async getARandomUser (id: number): Promise<User> {
        return this.repo
        .createQueryBuilder('user')
        .select()
        .orderBy('RAND()')
        .where('user.id != :id', { id })
        .getOne()
    }

    getCols<User>(): (keyof User)[] {
        return (this.repo.metadata.columns.map(col => col.propertyName) as (keyof User)[])
    }
}

