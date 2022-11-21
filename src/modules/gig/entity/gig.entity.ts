import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../../user/entity/user.entity';
import { Category } from '../../category/entity/category.entity';
import { IsNumber } from 'class-validator';

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

    @Column()
    @Expose()
    is_active: boolean;

    @Column()
    @Expose()
    title: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    @Expose()
    category: Category;

    @Column()
    @Expose()
    thumbnail: string;

    @Column()
    @Expose()
    @IsNumber()
    min_price: number;

    @Column()
    @Expose()
    @IsNumber()
    avg_rating: number;

    @Column()
    @Expose()
    metadata: string;
}
