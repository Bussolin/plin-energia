import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
    @ApiProperty({
        description: 'The timestamp of the error',
        example: '2021-01-01T00:00:00.000Z',
    })
    timestamp: string;

    @ApiProperty({
        description: 'The path of the error',
        example: '/example/path',
    })
    path: string;
}

export class ForbiddenErrorDto extends ErrorDto {
    @ApiProperty({
        description: 'The status code of the error',
        example: 403,
    })
    statusCode: number;

    @ApiProperty({
        description: 'The message of the error',
        example: 'Forbidden',
    })
    message: string;
}

export class BadRequestErrorDto extends ErrorDto {
    @ApiProperty({
        description: 'The status code of the error',
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        description: 'The message of the error',
        example: 'Bad request',
    })
    message: string;
}

export class UnauthorizedErrorDto extends ErrorDto {
    @ApiProperty({
        description: 'The status code of the error',
        example: 401,
    })
    statusCode: number;

    @ApiProperty({
        description: 'The message of the error',
        example: 'Unauthorized',
    })
    message: string;
}

export class InternalServerErrorDto extends ErrorDto {
    @ApiProperty({
        description: 'The status code of the error',
        example: 500,
    })
    statusCode: number;

    @ApiProperty({
        description: 'The message of the error',
        example: 'Internal server error',
    })
    message: string;
}
