import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    public catch(exception: any, host: ArgumentsHost) {
        this.logger.error(exception);
        const ctx = host.switchToHttp();

        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
          exception instanceof HttpException
            ? exception.message
            : 'Internal server error';
        
        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });

    }
} 