import { Module } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { CategoryRepository } from './repository/category.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [UsersService, CategoryRepository],
    exports: [UsersService],
})
export class CategoryModule {}
