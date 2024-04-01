import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BillItemService } from "../service/billItem.service";
import { BillItemDTO } from "./billItemDTO";
import { CookiesInterceptor } from "src/common/getCookies/cookies.interceptor";

@ApiTags("bill")
@Controller("bill")
@UseInterceptors(CookiesInterceptor)
export class BillItemResource {
  constructor(private billItemService: BillItemService) {}

  @Post("")
  @ApiBody({ type: "BillItemDTO", required: true })
  @ApiResponse({
    status: 201,
    type: "BillItemDTO",
  })
  @ApiResponse({ status: 404, description: "Cannot create bill." })
  @ApiOperation({})
  public async createBlog(
    @Body() BillItemDTO: BillItemDTO,
    @Query("newTenant") newTenant: string
  ): Promise<any> {
    const bill: BillItemDTO = await this.billItemService.BillItemCreate(
      BillItemDTO,
      newTenant
    );
    if (!bill) {
      throw new NotFoundException("bill not created");
    }
    return bill;
  }

  @Delete("/:id")
  @ApiResponse({ status: 200, type: "string" })
  @ApiResponse({
    status: 404,
    description: "bill item to deleted not found",
  })
  @ApiOperation({ summary: "Deleted bill item" })
  public async deleteBillItem(
    @Param("id") id: string,
    @Query("tenant") tenant: string
  ): Promise<any> {
    try {
      return await this.billItemService.deleteBillItem(id, tenant);
    } catch (error) {
      throw new NotFoundException("Bill item not deleted");
    }
  }
}
