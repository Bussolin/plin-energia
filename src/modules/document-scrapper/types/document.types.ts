import { Document, DocumentType } from '@prisma/client';

export type TDocumentCreateData = {
    type: DocumentType;
    title: string;
    content: string;
    createdById: string;
};

export type TDocument = Omit<Document, 'createdAt' | 'updatedAt'>;

export type TUser = {
    id: string;
    name: string;
    email: string;
};

export type TFindAllDocumentsOutput = {
    id: string;
    type: DocumentType;
    title: string;
};

export type TDocumentCreateOutput = Omit<
    Document,
    'createdById' | 'createdAt' | 'updatedAt'
>;

export type TFilesNames = string[];
