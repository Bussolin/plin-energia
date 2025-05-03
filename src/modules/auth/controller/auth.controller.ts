import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
    ApiTags,
    ApiOperation,
    ApiBody,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PublicRoute } from 'src/decorators/public-route.decorator';
import { LoginInputDto, LoginOutputDto } from '../dtos/login-dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @PublicRoute()
    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiBody({ type: LoginInputDto })
    @ApiOkResponse({
        description: 'The user has been successfully logged in.',
        type: LoginOutputDto,
    })
    @ApiNotFoundResponse({
        description: 'The user has not been found.',
    })
    @ApiUnauthorizedResponse({
        description: 'The user has not been authorized.',
    })
    async login(@Body() loginDto: LoginInputDto) {
        return this.authService.login(loginDto);
    }
}
