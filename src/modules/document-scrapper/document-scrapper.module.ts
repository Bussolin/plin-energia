import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DocumentScrapperController } from './controller/document-scrapper.controller';
import { DocumentDataService } from './services/document-data.service';
import { PDFScrapperService } from './services/pdf-scrapper.service';
import { WebScrapperService } from './services/web-scrapper.service';
import { DocumentDataController } from './controller/document-data.controller';

@Module({
    imports: [PrismaModule],
    controllers: [DocumentScrapperController, DocumentDataController],
    providers: [PDFScrapperService, WebScrapperService, DocumentDataService],
})
export class DocumentScrapperModule {}
