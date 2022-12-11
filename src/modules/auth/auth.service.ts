import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { SignUpDto } from './dto/signUp.dto';
import { ResponseAuthDto } from './dto/responseAuth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repository/user.repository';
import StripeService from '../stripe/stripe.service';
import Stripe from 'stripe';

@Injectable()
export class AuthService {
    private refreshTokenConfig = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        secret: process.env.REFRESH_TOKEN_SECRET,
    };
    constructor(
        private usersService: UsersService,
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private stripeService: StripeService,
    ) {}

    async validateUser(email: string, password: string): Promise<Partial<User>> {
        const user = await this.userRepository.findOneBy({ email: email });
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new BadRequestException({ message: 'UnAuthorized' });
        }
        return user;
    }

    async login(req: Request): Promise<ResponseAuthDto> {
        // console.log(req.body);
        const user: Partial<User> = req.user;
        const payload = { ...user };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, this.refreshTokenConfig),
        };
    }

    async signUp(signUpDto: SignUpDto): Promise<void> {
        const { email, password, username } = signUpDto;

        const exist = await this.userRepository.findOneBy({ email: email });
        if (exist) {
            throw new BadRequestException('User is existed');
        }
        const user = new User();

        const stripeAccount = await this.stripeService.createAccount(email);

        user.email = email;
        user.password = password;
        user.username = username;
        user.stripe_account_id = stripeAccount.id;

        await this.userRepository.save(user);
    }

    async getAccessToken(refreshToken: string): Promise<Partial<ResponseAuthDto>> {
        let refreshTokenDecode;
        try {
            refreshTokenDecode = await this.jwtService.verify(refreshToken, this.refreshTokenConfig);
        } catch (e) {
            throw new UnauthorizedException({ message: 'INVALID_TOKEN' });
        }
        return {
            access_token: this.jwtService.sign(refreshTokenDecode),
        };
    }

    async verifyPaymentAccount(req: Request): Promise<Stripe.Response<Stripe.AccountLink>> {
        const user: Partial<User> = req.user;
        // const accountLink = await this.stripeService.linkAccount(req.user?.stripe_account_id);
        // console.log(accountLink);
        return this.stripeService.linkAccount(user.stripe_account_id);
    }
}
