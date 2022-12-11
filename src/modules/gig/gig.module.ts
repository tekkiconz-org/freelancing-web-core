import { GigService } from './gig.service';
import { GigController } from './gig.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { GigRepository } from './repository/gig.repositoty';
import { Gig } from './entity/gig.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import { CategoryRepository } from '../category/repository/category.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
    imports: [TypeOrmModule.forFeature([Gig])],
    controllers: [GigController],
    providers: [GigService, GigRepository, UserRepository, CategoryRepository, CloudinaryService],
    exports: [GigService],
})
export class GigModule {}
