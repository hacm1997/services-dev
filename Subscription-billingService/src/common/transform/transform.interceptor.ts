import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JWTHelper } from "@beamar/microlib";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    try {
      const tokenRequest = request.headers.cookie.split(";").find((cookies) => {
        return cookies.trim().startsWith("auth.usr=");
      });
      const tokenParts = tokenRequest.split("=");
      const token = tokenParts[1];
      JWTHelper.parseCreztuJWT(token);
      return next.handle();
    } catch (error) {
      throw error;
    }
  }
}
