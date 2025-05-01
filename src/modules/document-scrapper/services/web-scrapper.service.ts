import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class WebScrapperService {
    constructor(private readonly prisma: PrismaClient) {}

    async scrappeURL(body: any) {}
}
