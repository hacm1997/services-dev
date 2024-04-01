import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RecurringBillingItemService } from "../service/recurringBillingItem.service";
import { RecurringBillingItemDTO } from "./recurringBillingItemDTO";
import { CookiesInterceptor } from "src/common/getCookies/cookies.interceptor";

@ApiTags("recurring")
@Controller("recurring")
@UseInterceptors(CookiesInterceptor)
export class RecurringBillingItemResource {
  constructor(private rbiService: RecurringBillingItemService) {}

  @Post("")
  @ApiBody({ type: "RecurringBillingItemDTO", required: true })
  @ApiResponse({
    status: 201,
    type: "RecurringBillingItemDTO",
  })
  @ApiResponse({
    status: 404,
    description: "Cannot create recurring billing item.",
  })
  @ApiOperation({})
  public async createBlog(
    @Body() RecurringBillingItemDTO: RecurringBillingItemDTO
  ): Promise<any> {
    const rbi: RecurringBillingItemDTO =
      await this.rbiService.RecurringBillingItemCreate(RecurringBillingItemDTO);
    if (!rbi) {
      throw new NotFoundException("recurring billing item not created");
    }
    return rbi;
  }

  @Get("")
  @ApiResponse({ status: 200, type: "string" })
  @ApiResponse({
    status: 404,
    description: "recurring bill item not found",
  })
  @ApiOperation({ summary: "get last recurring bill item" })
  public async getLastRecurringBill(
    @Query("tenant") tenant: string
  ): Promise<any> {
    const rbi: any = await this.rbiService.getLastRecurringBill(tenant);
    if (!rbi) {
      throw new NotFoundException("recurring bill item not found");
    }
    return rbi;
  }

  @Delete("/:id")
  @ApiResponse({ status: 200, type: "string" })
  @ApiResponse({
    status: 404,
    description: "recurring bill item to deleted not found",
  })
  @ApiOperation({ summary: "Deleted recurringbill item" })
  public async deleteRecurring(
    @Param("id") id: string,
    @Query("tenant") tenant: string
  ): Promise<any> {
    try {
      return await this.rbiService.deleteRecurring(id, tenant);
    } catch (error) {
      throw new NotFoundException("Recurring bill item not deleted");
    }
  }
}
