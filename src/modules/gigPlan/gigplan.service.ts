/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { GigPlanRepository } from './repository/gigplan.repository';
import { GigPlan } from './entity/gigPlan.entity';
import StripeService from '../stripe/stripe.service';
import { GigPlanCreationDto } from './dto/gigPlan.dto';
import { GigService } from '../gig/gig.service';

@Injectable()
export class GigPlanService {
    constructor(
        private gigPlanRepository: GigPlanRepository,
        private stripeService: StripeService,
        private gigService: GigService,
    ) {}

    async createGigPlan(gigPlanCreationDto: GigPlanCreationDto): Promise<GigPlan> {
        const gig = await this.gigService.getGigById(gigPlanCreationDto.gigId);

        if (!gig) {
            throw new BadRequestException("This gig doesn't exist");
        }

        const exist = await this.gigPlanRepository.findOneBy({
            gig: {
                id: gig.id,
            },
            plan_type: gigPlanCreationDto.planType,
        });

        if (exist) {
            throw new ConflictException('This plan has already existed');
        }

        const stripeProduct = await this.stripeService.createProduct(
            `${gig.title}_${gigPlanCreationDto.planType}`,
            gig.description,
        );

        const stripePrice = await this.stripeService.createPrice(gigPlanCreationDto.price, stripeProduct.id);

        const gigPlan: GigPlan = new GigPlan();
        gigPlan.gig = gig;
        gigPlan.plan_type = gigPlanCreationDto.planType;
        gigPlan.metadata = gigPlanCreationDto.metadata;
        gigPlan.stripe_product_id = stripeProduct.id;
        gigPlan.stripe_price_id = stripePrice.id;
        gigPlan.price = gigPlanCreationDto.price;
        gigPlan.descriptions = gigPlanCreationDto.descriptions;

        return this.gigPlanRepository.save(gigPlan);
    }
}
