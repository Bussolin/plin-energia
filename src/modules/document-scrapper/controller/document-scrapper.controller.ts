import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Query,
    ValidationPipe,
    UsePipes,
    Req,
} from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { PDFScrapperService } from '../services/pdf-scrapper.service';
import { WebScrapperService } from '../services/web-scrapper.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { ScrappePDFOutputDto } from '../dtos/scrappe-pdf-dto';
import { ScrappeURLDto, ScrappeUrlOutputDto } from '../dtos/scrappe-url-dto';
import { ApiCustomBearerAuth } from 'src/decorators/auth.decorator';

@ApiTags('Document Scrapper')
@Controller('document-scrapper')
@ApiCustomBearerAuth()
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
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
    async scrappePDF(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: Request & { userId: string },
    ) {
        return this.pdfScrapperService.scrappePDF(file, req);
    }

    @Post('url')
    @ApiOperation({ summary: 'Scrape a URL' })
    @ApiCreatedResponse({
        description: 'The URL has been successfully scraped',
        type: ScrappeUrlOutputDto,
    })
    @ApiQuery({ name: 'url', type: String })
    async scrappeURL(
        @Query() url: ScrappeURLDto,
        @Req() req: Request & { userId: string },
    ) {
        return this.webScrapperService.scrappeURL(url, req);
    }
}
