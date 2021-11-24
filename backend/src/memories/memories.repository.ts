import {EntityRepository, ILike, Repository} from 'typeorm';

import { Memory } from './memory.entity';

@EntityRepository(Memory)
export class MemoriesRepository extends Repository<Memory> {
    async findAll(userId: string): Promise<Memory[]> {
        return this.find({ where: { user: userId } });
    }

    async deleteOne(id: string) {
        return this.delete(id);
    }

    async search(term: string) {
        return this.find({ title: ILike(`%${term}%`) });
    }
}
