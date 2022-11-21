import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from './entity/category.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryRepository.save(createCategoryDto);
    }
    async getAllCategory(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }
    async deleteCategory(id: number): Promise<DeleteResult> {
        return await this.categoryRepository.delete({ id: id });
    }
}
