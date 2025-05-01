import { DocumentType } from '@prisma/client';

export type TDocumentCreateData = {
    type: DocumentType;
    title: string;
    content: string;
};

export type TFilesNames = string[];
