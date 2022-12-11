import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Gig } from '../../gig/entity/gig.entity';
import { ExtraType } from '../../extraType/entity/extraType.entity';

@Entity({
    name: 'gig_extra',
})
export class GigExtra {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Gig)
    @JoinColumn({ name: 'gig_id' })
    @Expose()
    gig: Gig;

    @ManyToOne(() => ExtraType)
    @JoinColumn({ name: 'extra_type_id' })
    @Expose()
    extraType: ExtraType;

    @Column()
    @Expose()
    price: number;

    @Column()
    @Expose()
    stripe_product_id: string;

    @Column()
    @Expose()
    stripe_price_id: string;
}
