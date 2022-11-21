import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Category } from '../../category/entity/category.entity';

export enum Type {
    LESS_TIME,
    OTHER,
}

@Entity({
    name: 'extra_type',
})
export class ExtraType {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    @Expose()
    category: Category;

    @Column({
        type: 'enum',
        enum: Type,
    })
    @Expose()
    type: Type;

    @Column()
    @Expose()
    title: string;
}
