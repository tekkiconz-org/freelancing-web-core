import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Gig } from '../../gig/entity/gig.entity';
import { User } from '../../user/entity/user.entity';
import { Transaction } from '../../transaction/entity/transaction.entity';

@Entity({
    name: 'gig_order',
})
export class GigOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Gig)
    @JoinColumn({ name: 'gig_id' })
    @Expose()
    gig: Gig;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'buyer_id' })
    @Expose()
    buyer: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'seller_id' })
    @Expose()
    seller: User;

    @Column()
    @Expose()
    extras: string;

    @Column()
    @Expose()
    created_at: string;

    @Column()
    @Expose()
    active_at: string;

    @Column()
    @Expose()
    status: string;

    @Column()
    @Expose()
    done_at: string;

    @Column()
    @Expose()
    order_preview: string;

    @Column()
    @Expose()
    comment: string;

    @OneToOne(() => Transaction)
    @JoinColumn({ name: 'transaction_id' })
    @Expose()
    transaction: Transaction;

    @Column()
    @Expose()
    totalPrice: string;

    @Column()
    @Expose()
    totalTime: string;
}
