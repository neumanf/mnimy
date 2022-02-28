import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemoriesController } from './controllers/memories.controller';
import { MemoriesRepository } from './repositories/memories.repository';
import { MemoriesService } from './services/memories.service';

@Module({
    imports: [TypeOrmModule.forFeature([MemoriesRepository])],
    controllers: [MemoriesController],
    providers: [MemoriesService],
})
export class MemoriesModule {}
