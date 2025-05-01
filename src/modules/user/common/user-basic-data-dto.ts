import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserBasicDataDto {
    @ApiProperty({ description: 'The id of the user', example: 'uuid' })
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

export class UserIdInputDto {
    @ApiProperty({ description: 'The id of the user', example: 'uuid' })
    @IsString()
    @IsNotEmpty()
    id: string;
}
