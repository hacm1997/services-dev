import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const origin_cors = process.env.APP_CORS_ORIGIN.toString();

    response.header('Access-Control-Allow-Origin', origin_cors);
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    response.header('Access-Control-Allow-Headers-Credentials', true);

    return next.handle();
  }
}
