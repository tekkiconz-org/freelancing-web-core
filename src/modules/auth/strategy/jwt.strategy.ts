import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import {UserRepository} from "../../user/repository/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.userRepository.findOne({
            where: {
                id: payload.id,
            },
        });
        if (!user) {
            return done(new UnauthorizedException({ message: 'user does not exist' }), false);
        }
        // return { email: payload.email, role: payload.role, id: payload.id };
        return done(null, user);
    }
}
