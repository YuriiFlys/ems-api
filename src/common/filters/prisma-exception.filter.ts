import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '../../../generated/prisma/client';
import { Response } from 'express';

type PrismaErrorMap = {
  [code: string]: { status: HttpStatus; message: string };
};

const PRISMA_ERROR_MAP: PrismaErrorMap = {
  P2002: {
    status: HttpStatus.CONFLICT,
    message: 'A record with that value already exists (unique constraint).',
  },
  P2025: {
    status: HttpStatus.NOT_FOUND,
    message: 'The requested record was not found.',
  },
  P2003: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Foreign key constraint violation.',
  },
  P2014: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Relation constraint violation.',
  },
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const mapped = PRISMA_ERROR_MAP[exception.code];

    if (mapped) {
      this.logger.warn(`Prisma ${exception.code}: ${mapped.message}`);

      return response.status(mapped.status).json({
        statusCode: mapped.status,
        error: exception.code,
        message: mapped.message,
        timestamp: new Date().toISOString(),
      });
    }

    this.logger.error(`Unhandled Prisma error [${exception.code}]`, exception.message);
    super.catch(exception, host);
  }
}
