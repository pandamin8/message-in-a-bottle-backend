import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private repo: Repository<User>) {}

    async create(creatingUser: User) {
        const { email, password } = creatingUser
        const userExists = await this.findByEmail(email)
        if (userExists) throw new BadRequestException('Email is in use')

        const user = this.repo.create({ email, password })
        await this.repo.save(user)

        return user
    }

    findByEmail(email: string) {
        return this.repo.findOneBy({ email })
    }

    findOne (id: number) {
        if (!id) return null
        return this.repo.findOneBy({ id })
    }

    async update (id: number, attrs: Partial<User>) {
        const user = await this.findOne(id)

        if (!user) throw new NotFoundException('User not found')

        Object.assign(user, attrs)

        return this.repo.save(user)
    }
}

