import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './serializers/session-serializer';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        PassportModule.register({ session: true }),
        TypeOrmModule.forFeature([UsersRepository]),
    ],
    providers: [AuthService, UsersService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
    exports: [PassportModule],
})
export class AuthModule {}
