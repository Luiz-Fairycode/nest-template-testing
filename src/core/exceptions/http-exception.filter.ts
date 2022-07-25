import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseException } from './response.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseException = exception.getResponse() as ResponseException;

    // TODO: INCLUIR O SENTRY IO AQUI

    response.status(status).json({
      statusCode: responseException.statusCode,
      message: responseException.message,
      error: responseException.error,
    });
  }
}
