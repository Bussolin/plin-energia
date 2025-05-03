import {
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaClient, Document } from '@prisma/client';
import {
    TDocument,
    TDocumentCreateData,
    TDocumentCreateOutput,
    TFindAllDocumentsOutput,
    TUser,
} from '../types/document.types';

@Injectable()
export class DocumentDataService {
    constructor(private readonly prisma: PrismaClient) {}

    async saveDocumentData(
        document: TDocumentCreateData,
    ): Promise<TDocumentCreateOutput> {
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

    async findAllDocuments(userId: string): Promise<TFindAllDocumentsOutput[]> {
        try {
            const documents = await this.prisma.document.findMany({
                where: {
                    createdById: userId,
                },
                select: {
                    id: true,
                    type: true,
                    title: true,
                },
            });

            if (!documents) {
                return [];
            }

            return documents;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error finding all documents');
        }
    }

    async findAllUsersWithDocuments(): Promise<TUser[]> {
        try {
            const users = await this.prisma.user.findMany({
                where: {
                    Document: {
                        some: {},
                    },
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            if (!users) {
                return [];
            }

            return users;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(
                'Error finding all users with documents',
            );
        }
    }

    async findDocument(userId: string, documentId: string): Promise<TDocument> {
        const document = await this.prisma.document.findUnique({
            where: {
                id: documentId,
                createdById: userId,
            },
            select: {
                id: true,
                type: true,
                title: true,
                content: true,
                createdById: true,
            },
        });

        if (!document) {
            throw new NotFoundException('Document not found');
        }

        return document;
    }
}
