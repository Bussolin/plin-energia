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
