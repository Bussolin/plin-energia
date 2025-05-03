import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DocumentType } from '@prisma/client';
import { convert } from 'pdf-poppler';
import { recognize } from 'tesseract.js';
import { DocumentDataService } from './document-data.service';
import * as fs from 'fs';
import * as path from 'path';
import * as pdfParse from 'pdf-parse';
import { TDocumentScrapperOutput } from '../common/document-scrapper.types';
import { TFilesNames } from '../types/document.types';
import { Request } from 'express';

@Injectable()
export class PDFScrapperService {
    constructor(private readonly documentDataService: DocumentDataService) {}

    async scrappePDF(
        file: Express.Multer.File,
        req: Request & { userId: string },
    ): Promise<TDocumentScrapperOutput> {
        try {
            const pdf = await pdfParse(file.buffer);
            const { info, metadata, text } = pdf;
            if (text.trim().length > 100) {
                // If the text is longer than 100 characters, it's not a image based PDF
                return await this.documentDataService.saveDocumentData({
                    type: DocumentType.PDF,
                    title:
                        info?.Title ||
                        metadata?._metadata['dc:title'] ||
                        file.originalname,
                    content: text,
                    createdById: req.userId,
                });
            }

            const { tmpDir, pdfPath, imagesDir } =
                await this.savePDFAndTempDirectories(file);

            const imageFiles: TFilesNames = await this.convertPDFToImages(
                pdfPath,
                imagesDir,
            );

            const ocrResults: string[] = await Promise.all(
                imageFiles.map((file) =>
                    recognize(fs.readFileSync(path.join(imagesDir, file)), 'por').then(
                        (result) => result.data.text,
                    ),
                ),
            );

            const fullText = ocrResults.join('\n');
            // Remove tmp directory
            fs.rmSync(tmpDir, { recursive: true, force: true });

            return await this.documentDataService.saveDocumentData({
                type: DocumentType.PDF,
                title:
                    info?.Title || metadata?._metadata['dc:title'] || file.originalname,
                content: fullText,
                createdById: req.userId,
            });
        } catch (error) {
            console.log(error.message, error.stack);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Error parsing PDF');
        }
    }

    async savePDFAndTempDirectories(file: Express.Multer.File) {
        try {
            // Create tmp directory if it doesn't exist
            const tmpDir = path.join(__dirname, '../../tmp');
            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir, { recursive: true });
            }

            // Create output directory if it doesn't exist
            const imagesDir = path.join(tmpDir, 'output');
            if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir, { recursive: true });
            }

            // Write PDF to disk
            const pdfPath = path.join(tmpDir, `${file.originalname}`);
            fs.writeFileSync(pdfPath, file.buffer);

            return { tmpDir, pdfPath, imagesDir };
        } catch (error) {
            console.log(error.message, error.stack);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException(
                'Error saving PDF and temp directories',
            );
        }
    }

    async convertPDFToImages(pdfPath: string, imageDir: string): Promise<TFilesNames> {
        try {
            await convert(pdfPath, {
                format: 'jpeg',
                out_dir: imageDir,
                out_prefix: 'pdfpage',
                page: null,
                dpi: 400,
            });

            const files = fs.readdirSync(imageDir);
            return files.filter((file) => /^pdfpage-\d+\.jpg$/.test(file));
        } catch (error) {
            console.log(error.message, error.stack);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Error converting PDF to images');
        }
    }
}
