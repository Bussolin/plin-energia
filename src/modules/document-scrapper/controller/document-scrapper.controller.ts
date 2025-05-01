import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { PDFScrapperService } from '../services/pdf-scrapper.service';
import { WebScrapperService } from '../services/web-scrapper.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ScrappePDFOutputDto } from '../dtos/scrappe-pdf-dto';

@ApiTags('Document Scrapper')
@Controller('document-scrapper')
export class DocumentScrapperController {
    constructor(
        private readonly pdfScrapperService: PDFScrapperService,
        private readonly webScrapperService: WebScrapperService,
    ) {}

    @Post('pdf')
    @ApiOperation({ summary: 'Scrape a PDF file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'The PDF file to scrape',
                },
            },
            required: ['file'],
        },
    })
    @ApiCreatedResponse({
        description: 'The PDF file has been successfully scraped',
        type: ScrappePDFOutputDto,
    })
    @UseInterceptors(FileInterceptor('file'))
    async scrappePDF(@UploadedFile() file: Express.Multer.File) {
        return this.pdfScrapperService.scrappePDF(file);
    }

    @Post('url')
    async scrappeURL(@Body() body: any) {
        return this.webScrapperService.scrappeURL(body);
    }
}
