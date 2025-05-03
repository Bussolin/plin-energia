import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';

export class FindDocumentOutputDto {
    @ApiProperty({
        description: 'The id of the document',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        description: 'The type of the document',
        example: 'PDF',
    })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({
        description: 'The title of the document',
        example: 'Document 1',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'The content of the document',
        example: 'What is the capital of France?',
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}
