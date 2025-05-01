import { ApiProperty } from '@nestjs/swagger';

export class ScrappePDFOutputDto {
    @ApiProperty({ type: String, example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ type: String, example: 'PDF' })
    type: string;

    @ApiProperty({ type: String, example: 'Example Title' })
    title: string;

    @ApiProperty({ type: String, example: 'Example Content' })
    content: string;
}
