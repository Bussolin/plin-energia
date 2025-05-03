import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { DocumentDataService } from '../services/document-data.service';
import { FindAllDocumentsOutputDto } from '../dtos/find-all-documents-dto';
import { ApiCustomBearerAuth } from '../../../decorators/auth.decorator';
import { FindDocumentOutputDto } from '../dtos/find-document-dto';

@Controller('document-data')
@ApiTags('Document Data')
@ApiCustomBearerAuth()
export class DocumentDataController {
    constructor(private readonly documentDataService: DocumentDataService) {}

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get all documents of a user by user id' })
    @ApiOkResponse({ type: [FindAllDocumentsOutputDto] })
    async findAllDocuments(@Param('userId') userId: string) {
        return await this.documentDataService.findAllDocuments(userId);
    }

    @Get('user/:userId/document/:documentId')
    @ApiOperation({ summary: 'Get a document by user id and document id' })
    @ApiOkResponse({ type: FindDocumentOutputDto })
    async findDocument(
        @Param('userId') userId: string,
        @Param('documentId') documentId: string,
    ) {
        return await this.documentDataService.findDocument(userId, documentId);
    }

    @Get('users-with-documents')
    @ApiOperation({ summary: 'Return all users who has documents' })
    @ApiOkResponse({ type: [String] })
    async findAllUsersWithDocuments() {
        return await this.documentDataService.findAllUsersWithDocuments();
    }
}
