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

    @Column({ nullable: true })
    @Expose()
    email: string;

    @Column({ nullable: true })
    @Expose()
    phone: string;

    @Column({ nullable: true })
    @Expose()
    username: string;

    @Column({ nullable: true })
    @Exclude()
    password: string;

    @Column({ nullable: true })
    @Expose()
    avatar_url: string;

    @Column({ nullable: true })
    @Expose()
    country_code: string;

    @Column({ nullable: true })
    @Expose()
    verification_status: string;

    @Column({ nullable: true })
    @Expose()
    status: string;

    @Column({ nullable: true })
    @Expose()
    verification_object: string;

    @Column({ nullable: true })
    @Expose()
    stripe_account_id: string;

    @BeforeInsert()
    async actionBeforeInsert(): Promise<void> {
        this.password = await bcrypt.hash(this.password, jwtConstants.saltRound);
    }
}
