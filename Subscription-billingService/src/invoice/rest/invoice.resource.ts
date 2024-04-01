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
import { CookiesInterceptor } from "src/common/getCookies/cookies.interceptor";
import { InvoiceService } from "../service/invoice.service";
import { InvoiceDTO } from "./invoiceDTO";

@ApiTags("invoice")
@Controller("invoice")
@UseInterceptors(CookiesInterceptor)
export class InvoiceResource {
  constructor(private invoiceService: InvoiceService) {}

  @Post("")
  @ApiBody({ type: "InvoiceDTO", required: true })
  @ApiResponse({
    status: 201,
    type: "InvoiceDTO",
  })
  @ApiResponse({
    status: 404,
    description: "Cannot create invoice",
  })
  @ApiOperation({})
  public async createBlog(@Body() invoiceDTO: InvoiceDTO): Promise<any> {
    const invoice: InvoiceDTO = await this.invoiceService.createInvoice(
      invoiceDTO
    );
    if (!invoice) {
      throw new NotFoundException("invoice could not be created");
    }
    return invoice;
  }

  @Delete("/:id")
  @ApiResponse({ status: 200, type: "string" })
  @ApiResponse({
    status: 404,
    description: "invoice to deleted not found",
  })
  @ApiOperation({ summary: "Deleted invoice" })
  public async deleteInvoice(
    @Param("id") id: string,
    @Query("tenant") tenant: string
  ): Promise<any> {
    try {
      return await this.invoiceService.deleteInvoice(id, tenant);
    } catch (error) {
      throw new NotFoundException("Invoice not deleted");
    }
  }
}
