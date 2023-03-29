import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from './message.entity'
import { User } from '../users/user.entity'
import { CreateMessageDto } from './dtos/create-message.dto'

@Injectable()
export class MessagesService {

    constructor (@InjectRepository(Message) private repo: Repository<Message>) {}

    async create (creatingMessage: CreateMessageDto, user: User) {
        const message = this.repo.create(creatingMessage)
        message.author = user
        
        return this.repo.save(message)
    }
}
