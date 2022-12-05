import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { SignUpDto } from './dto/signUp.dto';
import { ResponseAuthDto } from './dto/responseAuth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repository/user.repository';

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
    ) {}

    async validateUser(email: string, password: string): Promise<Partial<User>> {
        const user = await this.userRepository.findOneBy({ email: email });
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new HttpException({ message: 'UnAuthorized' }, HttpStatus.FORBIDDEN);
        }
        return {
            id: user.id,
            email: user.email,
        };
    }

    async login(req: Request): Promise<User> {
        // console.log(req.body);
        const admin = await this.userRepository.findOneBy({ email: req.body.username });
        if (!admin) {
            throw new HttpException({ message: 'Admin is not exist' }, HttpStatus.BAD_REQUEST);
        }
        const comparePassword = await bcrypt.compare(req.body.password, admin.password);
        if (!comparePassword) {
            throw new HttpException({ message: 'Wrong password' }, HttpStatus.FORBIDDEN);
        }
        // const payload = { email: user.email, sub: user.userId };
        return admin;
    }

    async signUp(signUpDto: SignUpDto): Promise<void> {
        const { email, password, username } = signUpDto;

        const exist = await this.userRepository.findOneBy({ email: email });
        if (exist) {
            throw new BadRequestException('User is existed');
        }
        const user = new User();
        user.email = email;
        user.password = password;
        user.username = username;
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
}
