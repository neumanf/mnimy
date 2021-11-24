import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { User } from '../users/user.entity';
import { Memory } from './memory.entity';
import { MemoriesRepository } from './memories.repository';

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

    async search(term: string): Promise<Pagination<Memory>> {
        const memories = await this.memoriesRepository.search(term);
        return new Pagination(memories, { itemCount: 0, itemsPerPage: 0, currentPage: 0 });
    }

    findOne(id: string): Promise<Memory> {
        return this.memoriesRepository.findOne(id);
    }

    deleteOne(id: string): Promise<DeleteResult> {
        return this.memoriesRepository.deleteOne(id);
    }
}
