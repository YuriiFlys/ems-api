import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) return;
    if (response.headersSent) return;

    const isProduction = process.env.NODE_ENV === 'production';

    const responseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: isProduction
        ? 'Something went wrong. Please try again later.'
        : (exception as Error)?.message ?? 'Unexpected error',
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    this.logger.error(
      `Unhandled exception → ${responseBody.path}`,
      (exception as Error)?.stack ?? String(exception),
    );

    httpAdapter.reply(response, responseBody, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

