import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from './entity/category.entity';
import { DeleteResult } from 'typeorm';

@Controller('category')
@ApiBearerAuth()
@ApiTags('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    async getAllCategory(): Promise<Category[]> {
        return await this.categoryService.getAllCategory();
    }
    @Delete('/:id')
    async deleteCategory(@Param() id: number): Promise<DeleteResult> {
        return await this.categoryService.deleteCategory(id);
    }
}
