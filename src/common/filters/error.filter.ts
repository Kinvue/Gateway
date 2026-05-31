import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { status as GrpcStatus } from '@grpc/grpc-js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  public catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let httpException: HttpException;

    if (exception instanceof HttpException) {
      httpException = exception;
    } else {
      httpException = this.mapGrpcErrorToHttpException(exception);
    }

    const statusCode = httpException.getStatus();

    response.status(statusCode).json({
      success: false,
      statusCode,
      message: httpException.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private mapGrpcErrorToHttpException(error: any): HttpException {
    switch (error.code) {
      case GrpcStatus.ALREADY_EXISTS:
        return new ConflictException(error.details || error.message);

      case GrpcStatus.NOT_FOUND:
        return new NotFoundException(error.details || error.message);

      case GrpcStatus.INVALID_ARGUMENT:
        return new BadRequestException(error.details || error.message);

      default:
        return new InternalServerErrorException('Internal server error');
    }
  }
}