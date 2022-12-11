/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { Request } from 'express';
import { Category } from '../category/entity/category.entity';
import { CategoryRepository } from '../category/repository/category.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from '../user/entity/user.entity';
import { UserRepository } from '../user/repository/user.repository';
import { GigCreationDto } from './dto/gigCreation.dto';
import { Gig, GigStatusEnum } from './entity/gig.entity';
import { GigRepository } from './repository/gig.repositoty';

@Injectable()
export class GigService {
    constructor(
        private gigRepository: GigRepository,
        private userRepository: UserRepository,
        private categoryRepository: CategoryRepository,
        private cloudinaryService: CloudinaryService,
    ) {}

    async createGigDetail(req: Request, gigCreationDto: GigCreationDto, file: Express.Multer.File): Promise<Gig> {
        const jwtUserInfo: Partial<User> = req.user;
        const user: User = await this.userRepository.findOneBy({ id: jwtUserInfo.id });

        if (!user) {
            throw new BadRequestException('No user have the provided credentials');
        }

        const { categoryId } = gigCreationDto;
        const category: Category = await this.categoryRepository.findOneBy({ id: categoryId });

        if (!category) {
            throw new BadRequestException('No category found.');
        }

        let imageURL = '';

        try {
            const cloudinaryResponse = await this.cloudinaryService.uploadImage(file, { folder: 'gigThumbnail' });
            imageURL = cloudinaryResponse.secure_url;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        const gig = new Gig();
        gig.avg_rating = 0;
        gig.min_price = 0;
        gig.title = gigCreationDto.title;
        gig.category = category;
        gig.user = user;
        gig.thumbnail = imageURL;
        gig.description = gigCreationDto.description;
        gig.status = GigStatusEnum.DESCRIPTION_CREATED;

        return this.gigRepository.save(gig);
    }

    async getGigById(id: number): Promise<Gig> {
        return this.gigRepository.findOneBy({ id });
    }
}
