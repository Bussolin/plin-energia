import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ScrappeURLDto {
    @IsUrl({ require_protocol: true })
    @IsNotEmpty()
    @ApiProperty({
        description: 'The URL to scrape',
        example: 'https://www.google.com',
    })
    url: string;
}

export class ScrappeUrlOutputDto {
    @ApiProperty({ type: String, example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ type: String, example: 'WEBSITE' })
    type: string;

    @ApiProperty({ type: String, example: 'Example Title' })
    title: string;

    @ApiProperty({ type: String, example: 'Example Content' })
    content: string;
}
