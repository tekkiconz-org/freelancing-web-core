import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../../user/entity/user.entity';

@Entity({
    name: 'user_bio',
})
export class UserBio {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    @Expose()
    user: User;

    @Column()
    @Expose()
    description: string;

    @Column()
    @Expose()
    firstName: string;

    @Column()
    @Expose()
    nickName: string;

    @Column()
    @Expose()
    lastName: string;

    @Column()
    @Expose()
    country_code: string;

    @Column()
    @Expose()
    created_at: string;
}
