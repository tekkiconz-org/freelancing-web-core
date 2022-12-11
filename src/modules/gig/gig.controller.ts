/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Body, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GigCreationDto } from './dto/gigCreation.dto';
import { Gig } from './entity/gig.entity';
import { GigService } from './gig.service';

@Controller('gig')
@ApiTags('Gig')
export class GigController {
    constructor(private readonly gigService: GigService) {}

    @Post('/create')
    @ApiBody({
        type: GigCreationDto,
    })
    @UseGuards(JWTAuthGuard)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('thumbnail'))
    async createGig(
        @Req() req: Request,
        @Body() gigCreationDto: GigCreationDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Gig> {
        return this.gigService.createGigDetail(req, gigCreationDto, file);
    }
}
