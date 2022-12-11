import { Module } from '@nestjs/common/decorators';
import { ConfigModule } from '@nestjs/config/dist';
import StripeService from './stripe.service';

@Module({
    imports: [ConfigModule],
    providers: [StripeService],
    exports: [StripeService],
})
export default class StripeModule {}
