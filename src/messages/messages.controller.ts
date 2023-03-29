import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message.dto'
import { MessagesService } from './messages.service'
import { MessagesRecipientsService } from './messages-recipients.service'
import { JwtAuthGuard } from '../auth/auth.guard'
import { Serialize } from '../interceptors/serialize-interceptor'
import { MessageDto } from './dtos/message.dto'

@Controller('messages')
@Serialize(MessageDto)
export class MessagesController {

    constructor (
        private messagesService: MessagesService,
        private messagesRecipientsService: MessagesRecipientsService
        ) {}

    @Post('send')
    @UseGuards(JwtAuthGuard)
    async sendMessage (@Request() req: any, @Body() body: CreateMessageDto) {
        const message = await this.messagesService.create(body, req.user)
        await this.messagesRecipientsService.create(message)
        return message
    }
}
