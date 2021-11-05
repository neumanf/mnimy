import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemoriesController } from './memories.controller';
import { MemoriesRepository } from './memories.repository';
import { MemoriesService } from './memories.service';

@Module({
    imports: [TypeOrmModule.forFeature([MemoriesRepository])],
    controllers: [MemoriesController],
    providers: [MemoriesService],
})
export class MemoriesModule {}
