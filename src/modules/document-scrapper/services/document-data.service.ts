import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentCreateData } from '../types/document.types';

@Injectable()
export class DocumentDataService {
    constructor(private readonly prisma: PrismaClient) {}

    async saveDocumentData(document: TDocumentCreateData) {
        try {
            const documentData = await this.prisma.document.create({
                data: document,
                select: {
                    id: true,
                    type: true,
                    title: true,
                    content: true,
                },
            });

            return documentData;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error saving document data');
        }
    }
}
