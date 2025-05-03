import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { PublicRoute } from 'src/decorators/public-route.decorator';
import { LoginInputDto } from '../dtos/login-dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @PublicRoute()
    @Post('login')
    async login(@Body() loginDto: LoginInputDto) {
        return this.authService.login(loginDto);
    }
}
