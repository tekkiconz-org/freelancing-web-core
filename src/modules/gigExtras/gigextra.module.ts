/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtraTypeModule } from '../extraType/extra-type.module';
import { GigModule } from '../gig/gig.module';
import StripeModule from '../stripe/stripe.module';
import { GigExtra } from './entity/gigExtra.entity';
import { GigExtraController } from './gig-extra.controller';
import { GigExtraService } from './gig-extra.service';
import { GigExtraRepository } from './repository/gigExtras.repository';

@Module({
    imports: [TypeOrmModule.forFeature([GigExtra]), GigModule, StripeModule, ExtraTypeModule],
    controllers: [GigExtraController],
    providers: [GigExtraService, GigExtraRepository],
    exports: [GigExtraService],
})
export class GigExtraModule {}
