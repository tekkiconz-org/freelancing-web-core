import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../../admin/entity/admin.entity';
import { AdminRepository } from '../../admin/repository/admin.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: AdminRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: any, done: VerifiedCallback) {
        const admin = await this.adminRepository.findOne({
            where: {
                id: payload.id,
            },
        });
        if (!admin) {
            return done(new UnauthorizedException({ message: 'user does not exist' }), false);
        }
        // return { email: payload.email, role: payload.role, id: payload.id };
        return done(null, admin);
    }
}
