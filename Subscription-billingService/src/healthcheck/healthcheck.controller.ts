import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthcheckController {
  @Get()
  public healthCheck() {
    return "BILLING SERVICE RUNNING";
  }
}
