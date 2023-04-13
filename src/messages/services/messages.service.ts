import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from '../entities/message.entity'
import { User } from '../../users/entities/user.entity'
import { CreateMessageDto } from '../dtos/create-message.dto'

@Injectable()
export class MessagesService {

    constructor (@InjectRepository(Message) private repo: Repository<Message>) {}

    async create (creatingMessage: CreateMessageDto, user: User) {
        const message = this.repo.create(creatingMessage)
        message.author = user
        
        return this.repo.save(message)
    }

    findOne (id: number, user: User) {
        if (!id || !user) return null

        return this.repo.findOne({ where: { id, author: { id: user.id } } })
    }

    async remove (user: User, id: number) {
        const message = await this.findOne(id, user)

        if (!message) throw new NotFoundException('Message not found')

        return this.repo.remove(message)
    }
}
