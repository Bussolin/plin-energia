import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { DocumentDataService } from './document-data.service';
import { DocumentType } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { TDocumentScrapperOutput } from '../common/document-scrapper.types';
import { ScrappeURLDto } from '../dtos/scrappe-url-dto';
import { Request } from 'express';

@Injectable()
export class WebScrapperService {
    constructor(private readonly documentDataService: DocumentDataService) {}

    async scrappeURL(
        data: ScrappeURLDto,
        req: Request & { userId: string },
    ): Promise<TDocumentScrapperOutput> {
        try {
            const response = await axios.get(data.url);
            const $ = cheerio.load(response.data);

            const bodyContent = $('body')
                .text()
                .replace(/\t+/g, '')
                .replace(/\n+/g, '\n')
                .trim();

            const title = $('title').text();

            return await this.documentDataService.saveDocumentData({
                type: DocumentType.WEBSITE,
                title: title ?? 'Untitled',
                content: bodyContent,
                createdById: req.userId,
            });
        } catch (error) {
            console.log(error);
            if (error instanceof HttpException) throw error;
            throw new BadRequestException('Error scraping URL');
        }
    }
}
