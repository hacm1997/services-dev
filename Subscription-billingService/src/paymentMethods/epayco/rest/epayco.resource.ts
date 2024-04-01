import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EpaycoService } from "../service/epayco.service";
import { PlanDTO } from "./planDTO";
import { CustomerDTO } from "./customerDTO";

@ApiTags("epayco")
@Controller("epayco")
export class EpaycoResource {
  constructor(private epaycoService: EpaycoService) {}

  @Post("plan")
  @ApiBody({ type: "PlanDTO", required: true })
  @ApiResponse({
    status: 201,
    type: "PlanDTO",
  })
  @ApiResponse({ status: 404, description: "Cannot create plan." })
  @ApiOperation({})
  public async createPlan(@Body() planDTO: PlanDTO): Promise<any> {
    const plan: PlanDTO = await this.epaycoService.createPlan(planDTO);
    if (!plan) {
      throw new NotFoundException("plan not created");
    }
    return plan;
  }

  @Get("plan/:id")
  @ApiBody({ type: "PlanDTO", required: true })
  @ApiResponse({
    status: 201,
    type: "PlanDTO",
  })
  @ApiResponse({ status: 404, description: "Cannot create plan." })
  @ApiOperation({})
  public async getPlan(@Param("id") id: string): Promise<any> {
    const plan: PlanDTO = await this.epaycoService.getPlan(id);
    if (!plan) {
      throw new NotFoundException("plan not found");
    }
    return plan;
  }

  @Post("customer")
  @ApiBody({ type: "CustomerDTO", required: true })
  @ApiResponse({
    status: 201,
    type: "CustomerDTO",
  })
  @ApiResponse({ status: 404, description: "Cannot create customer." })
  @ApiOperation({})
  public async createCustomer(@Body() CustomerDTO: CustomerDTO): Promise<any> {
    const customer: CustomerDTO = await this.epaycoService.createCustomer(
      CustomerDTO
    );
    if (!customer) {
      throw new NotFoundException("customer not created");
    }
    return customer;
  }

  @Post("token-card")
  @ApiBody({ type: "CardDTO", required: true })
  @ApiResponse({
    status: 201,
    type: "CardDTO",
  })
  @ApiResponse({ status: 404, description: "Cannot create token card." })
  @ApiOperation({})
  public async createTokenCard(@Body() card: any): Promise<any> {
    const tokenCard: any = await this.epaycoService.createTokenCard(card);
    if (!tokenCard) {
      throw new NotFoundException("token card not created");
    }
    return tokenCard;
  }
}
