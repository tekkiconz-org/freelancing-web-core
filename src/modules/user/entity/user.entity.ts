import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../../auth/constants';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Expose()
    email: string;

    @Column()
    @Expose()
    phone: string;

    @Column()
    @Expose()
    username: string;

    @Column()
    @Expose()
    @Exclude()
    password: string;

    @Column()
    @Expose()
    avatar_url: string;

    @Column()
    @Expose()
    country_code: string;

    @Column()
    @Expose()
    verification_status: string;

    @Column()
    @Expose()
    status: string;

    @Column()
    @Expose()
    verification_object: string;

    @Column()
    @Expose()
    stripe_account_id: string;

    @BeforeInsert()
    async actionBeforeInsert(): Promise<void> {
        this.password = await bcrypt.hash(this.password, jwtConstants.saltRound);
    }
}
