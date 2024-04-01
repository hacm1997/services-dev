"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookiesInterceptor = void 0;
const common_1 = require("@nestjs/common");
const tenantService_1 = require("./tenantService");
let CookiesInterceptor = class CookiesInterceptor {
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    intercept(context, next) {
        try {
            const request = context.switchToHttp().getRequest();
            const xsrfcookie = request.headers["xsrfcookie"];
            if (xsrfcookie) {
                const tenantID = xsrfcookie.split("=")[1];
                this.tenantService.setTenantID(tenantID);
            }
            return next.handle();
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CookiesInterceptor = CookiesInterceptor;
exports.CookiesInterceptor = CookiesInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenantService_1.TenantService])
], CookiesInterceptor);
//# sourceMappingURL=cookies.interceptor.js.map