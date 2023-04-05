import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MessageRecipient } from './message-recipient.entity'
import { User } from '../users/user.entity'
import { Message } from './message.entity'
import { UsersService } from '../users/users.service'
import { MessageIsReadInbox } from '../common/types/MessageIsReadInbox'

// Modules for pagination
import { PageDto } from '../common/dtos/page.dto'
import { PageMetaDto } from '../common/dtos/page-meta.dto'
import { PageOptionsDto } from '../common/dtos/page-options.dto'

import { paginate } from '../common/helper/pagination.helper'

@Injectable()
export class MessagesRecipientsService {

    constructor (
    @InjectRepository(MessageRecipient) private repo: Repository<MessageRecipient>
    , private userService: UsersService
    ) {}

    async create (message: Message) {
        const messageRecipient = this.repo.create()

        const randomRecipient = await this.userService.getARandomUser(message.author.id)
        
        if (randomRecipient.id === message.author.id) 
            throw new BadRequestException('You can\'t send a message to yourself')

        messageRecipient.recipient = randomRecipient
        messageRecipient.message = message

        return this.repo.save(messageRecipient)
    }

    async findOne (id: number, recipient: User) {
        if (!id) return null

        return this.repo.findOne({
            where: { id, recipient: { id: recipient.id } },
            join: { alias: 'mr', innerJoinAndSelect: {
                message: 'mr.message'
            } } 
        })
    }

    async listInbox (user: User, status: MessageIsReadInbox, pageOptionsDto: PageOptionsDto) {

        const isReadStatus = status ? status : 'all'

        let query = this.repo.createQueryBuilder('mr')
            .innerJoin('mr.message', 'message')          
            .select(['mr.id', 'mr.isRead', 'message.id', 'message.subject'])
            .where('mr.recipient = :id', { id: user.id })                   

        switch (isReadStatus) {
            case 'read':
                query = query.andWhere('mr.isRead = true')
                break
            case 'not_read':
                query = query.andWhere('mr.isRead = false')
        }

        return await paginate(query, pageOptionsDto)
    }

    async readMessage (user: User, id: number) {

        const messageRecipient = await this.findOne(id, user)

        if (!messageRecipient)
            throw new NotFoundException('Message not found')

        console.log(user)

        messageRecipient.isRead = true
        await this.repo.save(messageRecipient)

        return messageRecipient
    }
}