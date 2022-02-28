import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(username: string, email: string, password: string): Promise<User> {
        const user = this.create({ username, email, password });

        try {
            return await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('username or email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findById(id: string) {
        return await this.findOneOrFail({ where: { id } });
    }

    async findByUsername(username: string) {
        return await this.findOneOrFail({ where: { username } });
    }
}
