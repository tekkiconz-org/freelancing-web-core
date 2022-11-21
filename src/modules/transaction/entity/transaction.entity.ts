import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity({
    name: 'transaction',
})
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Expose()
    status: string;

    @Column()
    @Expose()
    metadata: string;

    @Column()
    @Expose()
    rating: string;

    @Column()
    @Expose()
    comment: string;
}
