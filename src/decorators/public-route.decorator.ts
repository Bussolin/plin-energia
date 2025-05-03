import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { BadRequestErrorDto, InternalServerErrorDto } from 'src/common/dtos/error-dto';

export const IS_PUBLIC_KEY = 'isPublic';

export const PublicRoute = () => {
    return applyDecorators(
        SetMetadata(IS_PUBLIC_KEY, true),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorDto,
        }),
        ApiBadRequestResponse({
            description: 'Bad request',
            type: BadRequestErrorDto,
        }),
    );
};
