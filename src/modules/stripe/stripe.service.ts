import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export default class StripeService {
    private stripe: Stripe;

    constructor(private configService: ConfigService) {
        this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), { apiVersion: '2022-11-15' });
    }

    public async createAccount(email: string): Promise<Stripe.Response<Stripe.Account>> {
        return this.stripe.accounts.create({ type: 'express', email });
    }

    public async linkAccount(id: string): Promise<Stripe.Response<Stripe.AccountLink>> {
        return this.stripe.accountLinks.create({
            account: id,
            refresh_url: 'http://localhost:3031',
            return_url: 'http://localhost:3031',
            type: 'account_onboarding',
        });
    }

    public async createProduct(name: string, description: string): Promise<Stripe.Response<Stripe.Product>> {
        return this.stripe.products.create({
            name,
            description,
        });
    }

    public async createPrice(price: number, productId: string): Promise<Stripe.Response<Stripe.Price>> {
        return this.stripe.prices.create({
            unit_amount: price,
            product: productId,
            currency: 'usd',
        });
    }
}
