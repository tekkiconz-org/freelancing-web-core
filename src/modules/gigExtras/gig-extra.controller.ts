/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GigExtraCreationDto } from './dto/gig-extra-creation.dto';
import { GigExtra } from './entity/gigExtra.entity';
import { GigExtraService } from './gig-extra.service';

@Controller('gig-extra')
export class GigExtraController {
    constructor(private readonly gigExtraService: GigExtraService) {}

    @Post('/create')
    @ApiBody({
        type: GigExtraCreationDto,
    })
    @UseGuards(JWTAuthGuard)
    async createGigExtra(@Body() gigExtraCreationDto: GigExtraCreationDto): Promise<GigExtra> {
        return this.gigExtraService.createGigExtra(gigExtraCreationDto);
    }
}
