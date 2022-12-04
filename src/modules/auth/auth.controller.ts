import {Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../user/users.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { Request } from 'express';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import {SignUpDto} from "./dto/signUp.dto";
import {GetAccessTokenForm} from "./dto/getAccessToken.dto";
import {ResponseAuthDto} from "./dto/responseAuth.dto";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

    @Post('/login')
    @ApiBody({
        type: LoginUserDto,
    })
    @UseGuards(JWTAuthGuard)
    async login(@Req() req: Request): Promise<any> {
        return this.authService.login(req);
    }


    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
        return this.authService.signUp(signUpDto);
    }

    @Post('access-token')
    @ApiBody({
        type: GetAccessTokenForm,
    })
    async getAccessToken(@Body('refreshToken') refreshToken: string): Promise<Partial<ResponseAuthDto>> {
        try {
            return this.authService.getAccessToken(refreshToken);
        } catch (e) {
            throw new Error(e);
        }
    }
}
