import { Length } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
export class Memory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Length(3, 30)
    title: string;

    @Column()
    @Length(3, 10000)
    content: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.memories)
    user: User;
}
