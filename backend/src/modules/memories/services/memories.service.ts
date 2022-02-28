import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { User } from '../../users/entities/user.entity';
import { Memory } from '../entities/memory.entity';
import { MemoriesRepository } from '../repositories/memories.repository';

@Injectable()
export class MemoriesService {
    constructor(
        @InjectRepository(MemoriesRepository)
        private readonly memoriesRepository: MemoriesRepository
    ) {}

    async create(_user: User, memory: Memory): Promise<Memory> {
        memory.user = _user;
        const createdMemory = await this.memoriesRepository.save(memory);
        delete createdMemory.user;
        return createdMemory;
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Memory>> {
        return paginate<Memory>(this.memoriesRepository, options);
    }

    async search(term: string, options: IPaginationOptions): Promise<Pagination<Memory>> {
        const memoriesBuilder = await this.memoriesRepository.search(term);
        return paginate(memoriesBuilder, options);
    }

    findOne(id: string): Promise<Memory> {
        return this.memoriesRepository.findOne(id);
    }

    deleteOne(id: string): Promise<DeleteResult> {
        return this.memoriesRepository.deleteOne(id);
    }
}
