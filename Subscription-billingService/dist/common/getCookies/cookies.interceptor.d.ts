import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { TenantService } from "./tenantService";
export declare class CookiesInterceptor implements NestInterceptor {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>;
}
