import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { authValues } from 'src/modules/auth/auth.constants';
import { UserService } from 'src/modules/user/services/user.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/public-route.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (isPublic) return true;

            const request = context.switchToHttp().getRequest();
            const token = this.getToken(request);

            const { sub: userId } = jwt.verify(token, authValues.jwt.secret, {
                algorithms: ['HS256'],
            }) as { sub: string };

            request.userId = userId;

            // Auto throw error if user no longer exists
            try {
                await this.userService.findById(userId);
            } catch (e) {
                throw new UnauthorizedException('User no longer exists');
            }

            return true;
        } catch (e) {
            console.error(e.message, e.stack);

            if (e instanceof HttpException) throw e;
            throw new UnauthorizedException('Invalid token');
        }
    }

    getToken(request: Request) {
        const requestToken = request?.headers?.authorization;

        if (!requestToken) {
            throw new UnauthorizedException('No token provided');
        }

        const [scheme, token] = requestToken.split(' ');

        if (scheme !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid token');
        }

        return token;
    }
}
