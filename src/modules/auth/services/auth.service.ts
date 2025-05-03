import {
    HttpException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { LoginInputDto } from '../dtos/login-dto';
import { verify as argon2verify } from 'argon2';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { authValues } from '../auth.constants';
import { TLoginResponse } from '../types/auth.types';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async login(loginDto: LoginInputDto): Promise<TLoginResponse> {
        let user: User;
        try {
            user = await this.userService.findByEmail(loginDto.email);
        } catch (e) {
            if (e instanceof HttpException) throw e;
            throw new NotFoundException('Invalid credentials');
        }

        const passwordMatch = await argon2verify(user.password, loginDto.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const userJwt = jwt.sign({ sub: user.id.toString() }, authValues.jwt.secret, {
            algorithm: 'HS256',
            expiresIn: authValues.jwt.expirationTime,
        });

        return {
            accessToken: userJwt,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}
