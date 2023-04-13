import { Controller, Post, Get, UseGuards, Body, Query, Param, Patch, Delete } from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message.dto'
import { MessagesService } from './services/messages.service'
import { MessagesRecipientsService } from './services/messages-recipients.service'
import { ReportsService } from './services/reports.service'
import { JwtAuthGuard } from '../auth/auth.guard'
import { Serialize } from '../interceptors/serialize-interceptor'
import { MessageDto } from './dtos/message.dto'
import { MessageIsReadInbox } from '../common/types/MessageIsReadInbox'
import { CreateReportDto } from './dtos/create-report.dto'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'

import { User } from '../users/entities/user.entity'

import { PageOptionsDto } from 'src/common/dtos/page-options.dto'
import { UserDto } from 'src/users/dtos/user.dto'

@Controller('messages')
export class MessagesController {

    constructor (
        private messagesService: MessagesService,
        private messagesRecipientsService: MessagesRecipientsService,
        private reportsService: ReportsService
        ) {}

    @Post('send')
    @Serialize(MessageDto)
    @UseGuards(JwtAuthGuard)
    async sendMessage (@CurrentUser() user: User, @Body() body: CreateMessageDto) {
        const message = await this.messagesService.create(body, user)
        await this.messagesRecipientsService.create(message)
        return message
    }

    @Get('inbox')
    @UseGuards(JwtAuthGuard)
    async getInbox(
    @CurrentUser() user: User,
    @Query('status') status: MessageIsReadInbox,
    @Query() pageOptions: PageOptionsDto
    ) {        
        const messages = await this.messagesRecipientsService
            .listInbox(user, status, pageOptions)
            
        return messages
    }

    @Patch('read/:id')
    @UseGuards(JwtAuthGuard)
    readMessage (@CurrentUser() user: User, @Param('id') id: number) {
        return this.messagesRecipientsService.readMessage(user, id)
    }

    @Get('sent')
    @UseGuards(JwtAuthGuard)
    listSent (
        @CurrentUser() user: User,
        @Query('status') status: MessageIsReadInbox,
        @Query() pageOptions: PageOptionsDto
        ) {
        return this.messagesRecipientsService.listSent(user, pageOptions, status)
    }

    @Post('report/:id')
    @UseGuards(JwtAuthGuard)
    reportMessage (@CurrentUser() user: User, @Param('id') id: number, @Body() body: CreateReportDto) {
        return this.reportsService.create(user, id, body)
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    deleteMessage (@CurrentUser() user: User, @Param('id') id: number) {
        return this.messagesService.remove(user, id)
    }
}
