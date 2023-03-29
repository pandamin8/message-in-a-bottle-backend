import { Module } from '@nestjs/common'
import { MessagesController } from './messages.controller'
import { MessagesService } from './messages.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from './message.entity'
import { MessageRecipient } from './message-recipient.entity'
import { UsersModule } from '../users/users.module'
import { MessagesRecipientsService } from './messages-recipients.service'

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRecipientsService],
  imports: [TypeOrmModule.forFeature([Message, MessageRecipient]), UsersModule]
})
export class MessagesModule {}
