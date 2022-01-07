import { EntityRepository, ILike, Repository } from 'typeorm';

import { Memory } from '../entities/memory.entity';

@EntityRepository(Memory)
export class MemoriesRepository extends Repository<Memory> {
    async findAll(userId: string): Promise<Memory[]> {
        return this.find({ where: { user: userId } });
    }

    async deleteOne(id: string) {
        return this.delete(id);
    }

    async search(term: string) {
        const queryBuilder = this.createQueryBuilder('search');
        queryBuilder.where('search.title LIKE :title', { title: `%${term}%` }).getMany();

        return queryBuilder;
    }
}
