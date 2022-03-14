import { User } from '../../users/entities/user.entity';

export class CreateMemoryDto {
    title: string;
    content: string;
    user?: User;
}
