import { Injectable } from '@nestjs/common';
import { ShippingGateway } from './shipping.gateway';
import { ShippingModelDTO } from './shipping.model.dto';
import { ShippingModel } from '../data/shipping.model';
import getCookies from 'src/common/interceptors/getCookies/cookies';
import { SHIPPING_GROUP } from 'src/infrastructure/dynamodb/intializer/Constants';

@Injectable()
export class ShippingUsecase {
  constructor(private shippingGateway: ShippingGateway) {}

  public async getAllShipping(request: Request): Promise<ShippingModelDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const shipping: ShippingModel[] = await this.shippingGateway.getAllShipping(
      getTenantId,
    );
    return shipping.map(this.mapDomainToDTO);
  }

  public async createShipping(
    shippingDTO: ShippingModelDTO,
    request: Request,
  ): Promise<ShippingModelDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const createdShipping: ShippingModel =
      await this.shippingGateway.createShipping(
        this.mapDTOToDomain(shippingDTO, getTenantId),
      );
    return this.mapDomainToDTO(createdShipping);
  }

  public async getShippingByCode(
    request: Request,
    shippingCode: string,
  ): Promise<ShippingModelDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const shipping: ShippingModel[] =
      await this.shippingGateway.getShippingByCode(getTenantId, shippingCode);

    return shipping.map(this.mapDomainToDTO);
  }

  public async putShipping(
    shippingDTO: ShippingModelDTO,
    request: Request,
  ): Promise<ShippingModelDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const putShipping: ShippingModel = await this.shippingGateway.putShipping(
      shippingDTO,
      getTenantId,
    );
    return this.mapDomainToDTO(putShipping);
  }

  public async deleteShipping(request: Request, id: string): Promise<any> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const deleteShipping: any = await this.shippingGateway.deleteShipping(
      id,
      getTenantId,
    );
    return deleteShipping;
  }

  private mapDTOToDomain(
    shippingDTO: ShippingModelDTO,
    tenantID: string,
  ): ShippingModel {
    const buildTenant = SHIPPING_GROUP + '#' + tenantID;
    const buildCode = SHIPPING_GROUP + '-' + shippingDTO.city;
    return ShippingModel.builder()
      .TENANTID(buildTenant)
      .SHIPPING_CODE(buildCode)
      .CITY(shippingDTO.city)
      .PRICE(shippingDTO.price)
      .EXTRAINFO(shippingDTO.extraInfo)
      .build();
  }

  private mapDomainToDTO(shipping: ShippingModel): ShippingModelDTO {
    return (
      ShippingModelDTO.builder()
        // .TENANTID(shipping.tenantID)
        .SHIPPING_CODE(shipping.shipping_code)
        .CITY(shipping.city)
        .PRICE(shipping.price)
        .EXTRAINFO(shipping.extraInfo)
        .build()
    );
  }
}
