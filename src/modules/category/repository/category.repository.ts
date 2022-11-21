import { DataSource, Repository } from 'typeorm';
import { Category } from '../entity/category.entity';

export class CategoryRepository extends Repository<Category> {
    constructor(private dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
    }
}
