import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserBasicDataDto } from '../common/user-basic-data-dto';

export class UserCreateInputDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The name of the user', example: 'Luis Carlos' })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The email of the user',
        example: 'luis.carlos@gmail.com',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The password of the user',
        example: '123456',
    })
    password: string;
}

export class UserCreateResponseDto extends UserBasicDataDto {}
