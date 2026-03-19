import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // class-validator throws an array of messages — flatten them
    const message =
      typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? (exceptionResponse as any).message
        : exceptionResponse;

    const error =
      typeof exceptionResponse === 'object' && 'error' in exceptionResponse
        ? (exceptionResponse as any).error
        : exception.name;

    const body = {
      statusCode,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (statusCode >= 500) {
      this.logger.error(JSON.stringify(body), exception.stack);
    } else {
      this.logger.warn(`${statusCode} ${request.method} ${request.url}`);
    }

    response.status(statusCode).json(body);
  }
}
