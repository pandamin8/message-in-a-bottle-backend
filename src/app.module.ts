import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/user.entity'
import { AuthModule } from './auth/auth.module';
import { getEnvPath } from './common/helper/env.helper'
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service'

const envFilePath = getEnvPath(`${__dirname}/common/envs`)
console.log(envFilePath)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UsersModule,
    MessagesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
