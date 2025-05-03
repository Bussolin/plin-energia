import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
    BadRequestErrorDto,
    ForbiddenErrorDto,
    InternalServerErrorDto,
    UnauthorizedErrorDto,
} from 'src/common/dtos/error-dto';

const AUTH_KEY = 'api-bearer-auth';

export const ApiCustomBearerAuth = () => {
    return applyDecorators(
        SetMetadata(AUTH_KEY, true),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({
            description: 'Unauthorized',
            type: UnauthorizedErrorDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorDto,
        }),
        ApiForbiddenResponse({ description: 'Forbidden', type: ForbiddenErrorDto }),
        ApiBadRequestResponse({ description: 'Bad request', type: BadRequestErrorDto }),
    );
};
