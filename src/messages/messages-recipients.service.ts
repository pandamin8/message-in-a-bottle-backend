import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MessageRecipient } from './message-recipient.entity'
import { User } from '../users/user.entity'
import { Message } from './message.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class MessagesRecipientsService {

    constructor (@InjectRepository(MessageRecipient) private repo: Repository<MessageRecipient>
    , private userService: UsersService) {}

    async create (message: Message) {
        const messageRecipient = this.repo.create()

        const randomRecipient = await this.userService.getARandomUser(message.author.id)
        
        if (randomRecipient.id === message.author.id) 
            throw new BadRequestException('You can\'t send a message to yourself')

        messageRecipient.recipient = randomRecipient
        messageRecipient.message = message

        return this.repo.save(messageRecipient)
    }
}