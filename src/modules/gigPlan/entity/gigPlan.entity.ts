import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Gig } from '../../gig/entity/gig.entity';

export enum PlanType {
    BASIC = 'BASIC',
    STANDARD = 'STANDARD',
    PREMIUM = 'PREMIUM',
}

@Entity({
    name: 'gig_plan',
})
export class GigPlan {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Gig)
    @JoinColumn({ name: 'gig_id' })
    @Expose()
    gig: Gig;

    @Column({
        type: 'enum',
        enum: PlanType,
    })
    @Expose()
    plan_type: PlanType;

    @Column()
    @Expose()
    descriptions: string;

    @Column()
    @Expose()
    price: number;

    @Column({ default: null })
    @Expose()
    metadata: string;

    @Column()
    @Expose()
    stripe_price_id: string;

    @Column()
    @Expose()
    stripe_product_id: string;
}
