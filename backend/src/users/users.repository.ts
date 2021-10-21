import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { SignUpCredentialsDto } from '../auth/dto/signup-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        const { username, email, password } = signUpCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, email, password: hashedPassword });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username or email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
