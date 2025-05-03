import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class GlobalRoutesException extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        try {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const request = ctx.getRequest<Request>();

            const data = exception.getResponse();

            response.status(data.statusCode).json({
                statusCode: data.statusCode,
                message: data.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        } catch (e) {
            console.error('Fail on global exception filter: ', e.message, e.stack);
            super.catch(e, host);
        }
    }
}
