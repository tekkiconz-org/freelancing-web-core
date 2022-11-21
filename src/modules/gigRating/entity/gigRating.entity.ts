import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { GigOrder } from '../../gigOrder/entity/gigOrder.entity';
import { Gig } from '../../gig/entity/gig.entity';

@Entity({
    name: 'gig_rating',
})
export class GigRating {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => GigOrder)
    @JoinColumn({ name: 'gig_order_id' })
    @Expose()
    gigOrder: GigOrder;

    @ManyToOne(() => Gig)
    @JoinColumn({ name: 'gig_id' })
    @Expose()
    gig: Gig;
}
