import { Injectable } from "@nestjs/common";

@Injectable()
export class TenantService {
  private tenantID: string;

  setTenantID(id: string) {
    this.tenantID = id;
  }

  getTenantID(): string {
    return this.tenantID;
  }
}
