import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { TenantService } from "./tenantService";

@Injectable()
export class CookiesInterceptor implements NestInterceptor {
  constructor(private readonly tenantService: TenantService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const xsrfcookie = request.headers["xsrfcookie"]; // Accede a xsrfcookie desde los encabezados de la solicitud
      if (xsrfcookie) {
        const tenantID = xsrfcookie.split("=")[1];
        this.tenantService.setTenantID(tenantID);
      }
      return next.handle();
    } catch (error) {
      throw error;
    }
  }
}
