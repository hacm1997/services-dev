import { CookiesInterceptor } from "./cookies.interceptor";
import { TenantService } from "./tenantService";

describe("CookiesInterceptor", () => {
  let interceptor: CookiesInterceptor;
  let tenantService: TenantService;

  beforeEach(() => {
    tenantService = new TenantService();
    interceptor = new CookiesInterceptor(tenantService);
  });

  it("should be defined", () => {
    expect(interceptor).toBeDefined();
  });
});
