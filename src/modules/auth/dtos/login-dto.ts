import { IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginInputDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'luis.carlos@gmail.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'The password of the user', example: '123456' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

class User {
    @ApiProperty({ description: 'The id of the user', example: '123456' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'The name of the user', example: 'Luis Carlos' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'luis.carlos@gmail.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class LoginOutputDto {
    @ApiProperty({ description: 'The access token of the user', example: '123456' })
    @IsString()
    @IsNotEmpty()
    accessToken: string;

    @ApiProperty({ description: 'The user of the user', example: '123456' })
    @IsString()
    @IsNotEmpty()
    user: User;
}
