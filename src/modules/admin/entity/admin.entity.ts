import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity({
    name: 'admins',
})
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    paymentKey: string;
    @BeforeInsert()
    async actionBeforeInsert(): Promise<void> {
        this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUND);
    }
}
