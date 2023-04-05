import { Controller, Post, Get, UseGuards, Request, Body, Query, Param } from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message.dto'
import { MessagesService } from './messages.service'
import { MessagesRecipientsService } from './messages-recipients.service'
import { JwtAuthGuard } from '../auth/auth.guard'
import { Serialize } from '../interceptors/serialize-interceptor'
import { MessageDto } from './dtos/message.dto'
import { MessageIsReadInbox } from '../common/types/MessageIsReadInbox'

import { PageDto } from 'src/common/dtos/page.dto'
import { PageOptionsDto } from 'src/common/dtos/page-options.dto'

@Controller('messages')
export class MessagesController {

    constructor (
        private messagesService: MessagesService,
        private messagesRecipientsService: MessagesRecipientsService
        ) {}

    @Post('send')
    @Serialize(MessageDto)
    @UseGuards(JwtAuthGuard)
    async sendMessage (@Request() req: any, @Body() body: CreateMessageDto) {
        const message = await this.messagesService.create(body, req.user)
        await this.messagesRecipientsService.create(message)
        return message
    }

    @Get('inbox')
    @UseGuards(JwtAuthGuard)
    async getInbox(
    @Request() req: any,
    @Query('status') status: MessageIsReadInbox,
    @Query() pageOptionsDto: PageOptionsDto
    ) {        
        const messages = await this.messagesRecipientsService
            .listInbox(req.user, status, pageOptionsDto)
            
        return messages
    }

    @Post('read/:id')
    @UseGuards(JwtAuthGuard)
    readMessage (@Request() req, @Param('id') id: number) {
        return this.messagesRecipientsService.readMessage(req.user, id)
    }
}
