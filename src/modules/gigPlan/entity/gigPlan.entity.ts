import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Gig } from '../../gig/entity/gig.entity';

export enum PlanType {
    BASIC,
    STANDARD,
    PREMIUM,
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
    price: string;

    @Column()
    @Expose()
    metadata: string;
}
