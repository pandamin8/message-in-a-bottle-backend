import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper'
import { JwtService } from '@nestjs/jwt'
import { JwtStrategy } from './auth.strategy'
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('JWT_KEY'),
                signOptions: { expiresIn: config.get('JWT_EXPIRES') }
            })
        })
    ],
    providers: [AuthService, AuthHelper, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
