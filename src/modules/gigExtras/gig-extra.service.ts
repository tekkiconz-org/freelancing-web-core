/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ExtraTypeService } from '../extraType/extra-type.service';
import { GigService } from '../gig/gig.service';
import StripeService from '../stripe/stripe.service';
import { GigExtraCreationDto } from './dto/gig-extra-creation.dto';
import { GigExtra } from './entity/gigExtra.entity';
import { GigExtraRepository } from './repository/gigExtras.repository';

@Injectable()
export class GigExtraService {
    constructor(
        private gigExtraRepository: GigExtraRepository,
        private gigService: GigService,
        private extraTypeService: ExtraTypeService,
        private stripeService: StripeService,
    ) {}

    async createGigExtra(gigExtraCreationDto: GigExtraCreationDto): Promise<GigExtra> {
        const gig = await this.gigService.getGigById(gigExtraCreationDto.gigId);

        if (!gig) {
            throw new BadRequestException(`This gig doesn't exist`);
        }

        const extraType = await this.extraTypeService.getExtraTypeById(gigExtraCreationDto.extraTypeId);

        if (!extraType) {
            throw new BadRequestException(`This extra type doesn't exist`);
        }
        const exist = await this.gigExtraRepository.findOneBy({
            gig: {
                id: gig.id,
            },
            extraType: {
                id: extraType.id,
            },
        });

        if (exist) {
            throw new ConflictException('This gig extra already exist');
        }

        const stripeProduct = await this.stripeService.createProduct(
            `GIG_EXTRA-${gig.title}-${extraType.type}`,
            extraType.title,
        );

        const stripePrice = await this.stripeService.createPrice(gigExtraCreationDto.price, stripeProduct.id);

        const gigExtra = new GigExtra();
        gigExtra.gig = gig;
        gigExtra.extraType = extraType;
        gigExtra.price = gigExtraCreationDto.price;
        gigExtra.stripe_price_id = stripePrice.id;
        gigExtra.stripe_product_id = stripeProduct.id;

        return this.gigExtraRepository.save(gigExtra);
    }
}
