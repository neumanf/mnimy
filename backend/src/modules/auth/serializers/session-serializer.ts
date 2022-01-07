import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { User } from '../../users/entities/user.entity';
import { UsersRepository } from '../../users/repositories/users.repository';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(@Inject(UsersRepository) private readonly userRepository: UsersRepository) {
        super();
    }

    serializeUser(user: User, done: Function) {
        done(null, user);
    }

    async deserializeUser(payload: User, done: Function) {
        const user = await this.userRepository.findById(payload.id);

        return user ? done(null, user) : done(null, null);
    }
}
