/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GigModule } from '../gig/gig.module';
import StripeModule from '../stripe/stripe.module';
import { GigPlan } from './entity/gigPlan.entity';
import { GigPlanController } from './gigplan.controller';
import { GigPlanService } from './gigplan.service';
import { GigPlanRepository } from './repository/gigplan.repository';

@Module({
    imports: [TypeOrmModule.forFeature([GigPlan]), StripeModule, GigModule],
    controllers: [GigPlanController],
    providers: [GigPlanService, GigPlanRepository],
    exports: [GigPlanService],
})
export class GigPlanModule {}
