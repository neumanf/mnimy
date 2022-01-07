import { Inject, Injectable } from '@nestjs/common';

import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(@Inject(UsersRepository) private readonly usersRepository: UsersRepository) {}

    async create(username: string, email: string, password: string) {
        return await this.usersRepository.createUser(username, email, password);
    }

    async findByUsername(username: string) {
        return await this.usersRepository.findByUsername(username);
    }
}
