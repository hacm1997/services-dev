import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class CorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('im hereee!!!');
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.setHeader(
      'Access-Control-Allow-Origin',
      process.env.APP_DOMAIN.split(','),
    );
    response.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Authorization, Accept, xsrfCookie',
    );
    response.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE',
    );
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    return next.handle();
  }
}
