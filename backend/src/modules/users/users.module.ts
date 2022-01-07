import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    controllers: [],
    providers: [UsersService],
})
export class UsersModule {}
