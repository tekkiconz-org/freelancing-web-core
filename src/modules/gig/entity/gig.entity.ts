import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../../user/entity/user.entity';
import { Category } from '../../category/entity/category.entity';
import { IsNumber } from 'class-validator';

export enum GigStatusEnum {
    DESCRIPTION_CREATED,
    PLAN_CREATED,
    ACTIVE,
    DISABLED,
}

@Entity({
    name: 'gig',
})
export class Gig {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    @Expose()
    user: User;

    @Column({
        type: 'enum',
        enum: GigStatusEnum,
    })
    @Exclude()
    status: GigStatusEnum;

    @Column({
        nullable: true,
    })
    @Expose()
    title: string;

    @Column({
        nullable: true,
    })
    @Expose()
    description: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    @Expose()
    category: Category;

    @Column({
        nullable: true,
    })
    @Expose()
    thumbnail: string;

    @Column({
        nullable: true,
    })
    @Expose()
    @IsNumber()
    min_price: number;

    @Column({
        nullable: true,
    })
    @Expose()
    @IsNumber()
    avg_rating: number;

    @Column({
        nullable: true,
    })
    @Expose()
    metadata: string;
}
