import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";



@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger("HTTP");

    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const delay = Date.now() - now;
                this.logger.log(`${method} ${url} ${delay}ms`);
            })
        );
    }
}