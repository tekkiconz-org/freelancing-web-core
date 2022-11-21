import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: jwtConstants.accessTokenSecret,
            signOptions: { expiresIn: jwtConstants.accessTokenExpiry },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
