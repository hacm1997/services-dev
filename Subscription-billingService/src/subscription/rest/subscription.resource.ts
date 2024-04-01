import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SubscriptionService } from "../service/subscription.service";
import { SubscriptionDTO } from "./subscriptionDTO";
import { CookiesInterceptor } from "src/common/getCookies/cookies.interceptor";

@ApiTags("subscription")
@Controller("subscription")
@UseInterceptors(CookiesInterceptor)
export class SubscriptionResource {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post("")
  @ApiBody({ type: "SubscriptionDTO", required: true })
  @ApiResponse({
    status: 201,
    type: "SubscriptionDTO",
  })
  @ApiResponse({ status: 404, description: "Cannot create subscription." })
  @ApiOperation({})
  public async createBlog(
    @Body() SubscriptionDTO: SubscriptionDTO
  ): Promise<any> {
    const subscription: SubscriptionDTO =
      await this.subscriptionService.createSubscription(SubscriptionDTO);
    if (!subscription) {
      throw new NotFoundException("subscription not created");
    }
    return subscription;
  }

  @Get("")
  @ApiResponse({ status: 200, type: "SubsDTO" })
  @ApiResponse({ status: 404, description: "Subs not found" })
  @ApiOperation({ summary: "Get Subscription" })
  public async getAllSubs(
    @Query("page") page: string,
    @Query("limit") pageSize: string
  ): Promise<any> {
    const subs: any = await this.subscriptionService.getAllSubscriptions(
      Number(page),
      Number(pageSize)
    );
    if (!subs) {
      throw new NotFoundException("Subscription not found");
    }
    return subs;
  }

  @Get("/tenant/:tenant")
  @ApiResponse({ status: 200, type: "SubsDTO" })
  @ApiResponse({ status: 404, description: "Subs not found" })
  @ApiOperation({ summary: "Get Subscription" })
  public async getSubByTenant(@Param("tenant") tenant: string): Promise<any> {
    const subscription: any =
      await this.subscriptionService.getSubscriptionsByTenant(tenant);
    if (!subscription) {
      throw new NotFoundException("Subscription not found");
    }
    return subscription;
  }

  @Put("")
  @ApiResponse({ status: 200, type: "SubscriptionDTO" })
  @ApiResponse({
    status: 404,
    description: "The subscription cannot be edited",
  })
  @ApiOperation({ summary: "Edit subscription" })
  public async updateSubs(
    @Body() subscriptionDTO: SubscriptionDTO
  ): Promise<SubscriptionDTO> {
    return await this.subscriptionService.updateSubscription(subscriptionDTO);
  }

  @Put("/payment/:tenant")
  @ApiResponse({ status: 200, type: "SubscriptionDTO" })
  @ApiResponse({
    status: 404,
    description: "The subscription cannot be edited",
  })
  @ApiOperation({ summary: "Edit subscription" })
  public async updateSubsPendingPayment(
    @Param("tenant") tenant: string,
    @Query("payment") payment: string
  ): Promise<SubscriptionDTO> {
    return await this.subscriptionService.updateSubsPendingPayment(
      tenant,
      payment
    );
  }

  @Put("/cancel")
  @ApiResponse({ status: 200, type: "SubscriptionDTO" })
  @ApiResponse({
    status: 404,
    description: "The subscription cannot be canceled",
  })
  @ApiOperation({ summary: "Cancel subscription" })
  public async cancelSubscription(
    @Query("tenant") tenant: string
  ): Promise<any> {
    return await this.subscriptionService.cancelSubscription(tenant);
  }

  @Put("/reactive")
  @ApiResponse({ status: 200, type: "SubscriptionDTO" })
  @ApiResponse({
    status: 404,
    description: "The subscription cannot be reactivate",
  })
  @ApiOperation({ summary: "Reactivate subscription" })
  public async reactivateSubscription(
    @Query("tenant") tenant: string
  ): Promise<any> {
    return await this.subscriptionService.reactivateSubscription(tenant);
  }

  @Put("/active")
  @ApiResponse({ status: 200, type: "SubscriptionDTO" })
  @ApiResponse({
    status: 404,
    description: "The subscription cannot be activate",
  })
  @ApiOperation({ summary: "Activate subscription" })
  public async activateSubscription(
    @Query("tenant") tenant: string
  ): Promise<any> {
    return await this.subscriptionService.activateSubscription(tenant);
  }

  @Delete("")
  @ApiResponse({ status: 200, type: "string" })
  @ApiResponse({
    status: 404,
    description: "subscription to deleted not found",
  })
  @ApiOperation({ summary: "Deleted subscription" })
  public async deleteSubscription(
    @Query("tenant") tenant: string
  ): Promise<any> {
    try {
      return await this.subscriptionService.deleteSubscription(tenant);
    } catch (error) {
      throw new NotFoundException("Subscription not deleted");
    }
  }
}
