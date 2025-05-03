import { DocumentType } from '@prisma/client';

export type TDocumentScrapperOutput = {
    type: DocumentType;
    title: string;
    content: string;
};
