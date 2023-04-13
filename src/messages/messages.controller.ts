import { Controller, Post, Get, UseGuards, Request, Body, Query, Param, Patch } from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message.dto'
import { MessagesService } from './services/messages.service'
import { MessagesRecipientsService } from './services/messages-recipients.service'
import { ReportsService } from './services/reports.service'
import { JwtAuthGuard } from '../auth/auth.guard'
import { Serialize } from '../interceptors/serialize-interceptor'
import { MessageDto } from './dtos/message.dto'
import { MessageIsReadInbox } from '../common/types/MessageIsReadInbox'
import { CreateReportDto } from './dtos/create-report.dto'

import { PageOptionsDto } from 'src/common/dtos/page-options.dto'

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
    @Query() pageOptions: PageOptionsDto
    ) {        
        const messages = await this.messagesRecipientsService
            .listInbox(req.user, status, pageOptions)
            
        return messages
    }

    @Patch('read/:id')
    @UseGuards(JwtAuthGuard)
    readMessage (@Request() req, @Param('id') id: number) {
        return this.messagesRecipientsService.readMessage(req.user, id)
    }

    @Get('sent')
    @UseGuards(JwtAuthGuard)
    listSent (
        @Request() req,
        @Query('status') status: MessageIsReadInbox,
        @Query() pageOptions: PageOptionsDto
        ) {
        return this.messagesRecipientsService.listSent(req.user, pageOptions, status)
    }

    @Post('report/:id')
    @UseGuards(JwtAuthGuard)
    report (@Request() req, @Param('id') id: number, @Body() body: CreateReportDto) {
        return this.reportsService.create(req.user, id, body)
    }
}
