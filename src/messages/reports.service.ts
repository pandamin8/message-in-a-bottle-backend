import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MessagesRecipientsService } from './messages-recipients.service'
import { CreateReportDto } from './dtos/create-report.dto'

import { Report } from './entities/report.entity'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class ReportsService {
    constructor (
        @InjectRepository(Report) private repo: Repository<Report>,
        private messagesRecipientsService: MessagesRecipientsService
    ) {}

    async create (user: User, id: number, body: CreateReportDto) {
        const messageRecipient = await this.messagesRecipientsService.findOne(id, user)

        if (!messageRecipient) throw new NotFoundException('Message not found')

        const report = this.repo.create(body)
        report.reportedMessage = messageRecipient
        report.reporter = user

        await this.repo.save(report)

        return report
    }
}