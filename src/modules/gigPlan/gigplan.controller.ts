/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GigPlanCreationDto } from './dto/gigPlan.dto';
import { GigPlan } from './entity/gigPlan.entity';
import { GigPlanService } from './gigplan.service';

@Controller('gig-plan')
@ApiTags('Gig Plan')
export class GigPlanController {
    constructor(private readonly gigPlanService: GigPlanService) {}

    @Post('/create')
    @ApiBody({
        type: GigPlanCreationDto,
    })
    @UseGuards(JWTAuthGuard)
    async createGigPlan(@Body() gigPlanCreationDto: GigPlanCreationDto): Promise<GigPlan> {
        return this.gigPlanService.createGigPlan(gigPlanCreationDto);
    }
}
