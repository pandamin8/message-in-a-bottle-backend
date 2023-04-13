import { Module } from '@nestjs/common'
import { MessagesController } from './messages.controller'
import { MessagesService } from './services/messages.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from './entities/message.entity'
import { MessageRecipient } from './entities/message-recipient.entity'
import { Report } from './entities/report.entity'
import { UsersModule } from '../users/users.module'
import { MessagesRecipientsService } from './services/messages-recipients.service'
import { ReportsService } from './services/reports.service'

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRecipientsService, ReportsService],
  imports: [TypeOrmModule.forFeature([Message, MessageRecipient, Report]), UsersModule]
})
export class MessagesModule {}
