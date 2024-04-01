import { Inject, Injectable } from '@nestjs/common';
import { ShippingEnum } from 'src/infrastructure/model/shipping/shipping.enum';
import { ShippingModelData } from 'src/infrastructure/model/shipping/shipping.model.data';
import { ShippingModel } from 'src/shipping/data/shipping.model';
import { ShippingRepository } from 'src/shipping/data/shipping.repository';
import { ShippingGateway } from 'src/shipping/rest/shipping.gateway';

@Injectable()
export class ShippingAdapter extends ShippingGateway {
  constructor(
    @Inject('ShippingRepository')
    private shippingRepository: ShippingRepository,
  ) {
    super();
  }

  public async createShipping(shipping: ShippingModel): Promise<ShippingModel> {
    try {
      const storeShipping = await this.shippingRepository.createShipping(
        this.mapToData(shipping, ShippingEnum.NEW),
      );
      return this.mapToDomain(storeShipping);
    } catch (error) {
      console.log(error);
      throw new Error('Error to create product in db.');
    }
  }

  public async getAllShipping(tenantID: string): Promise<ShippingModel[]> {
    try {
      const storeShipping = await this.shippingRepository.getAllShipping(
        tenantID,
      );

      if (storeShipping) {
        return storeShipping.map(this.mapToDomain);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error getting Shipping from db:', error);
      throw new Error('Error to get Shipping in db.');
    }
  }

  public async getShippingByCode(
    shippingCode: string,
    tenantID: string,
  ): Promise<ShippingModel[]> {
    try {
      const storeShipping = await this.shippingRepository.getShippingByCode(
        shippingCode,
        tenantID,
      );

      if (storeShipping) {
        return storeShipping.map(this.mapToDomain);
      } else {
        return []; // Devolver un arreglo vacío si no se encontraron productos
      }
    } catch (error) {
      console.error('Error getting shipping from db:', error);
      throw new Error('Error to get shipping in db.');
    }
  }

  public async putShipping(
    shipping: ShippingModel,
    tenantID: string,
  ): Promise<ShippingModel> {
    try {
      const storeShipping = await this.shippingRepository.putShipping(
        tenantID,
        this.mapToData(shipping, ShippingEnum.NEW),
      );
      return this.mapToDomain(storeShipping);
    } catch (error) {
      console.log('Error to update shipping.');
      throw new Error(error);
    }
  }

  public async deleteShipping(id: string, tenantID: string): Promise<void> {
    try {
      const storeShipping = await this.shippingRepository.deleteShipping(
        id,
        tenantID,
      );
      return storeShipping;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  private mapToData(
    shipping: ShippingModel,
    behavior: ShippingEnum,
  ): ShippingModelData {
    const shippingData = new ShippingModelData(
      shipping.tenantID,
      shipping.shipping_code,
      shipping.city,
      shipping.price,
      shipping.extraInfo,
    );
    if (behavior === ShippingEnum.UPDATE)
      shippingData.extraInfo = shipping.extraInfo;
    return shippingData;
  }

  private mapToDomain(shippingData: ShippingModelData): ShippingModel {
    return ShippingModel.builder()
      .TENANTID(shippingData.tenantID)
      .SHIPPING_CODE(shippingData.shipping_code)
      .CITY(shippingData.city)
      .PRICE(shippingData.price)
      .EXTRAINFO(shippingData.extraInfo)
      .build();
  }
}
