import { Injectable } from '@nestjs/common';
import { ProductInterface } from '../data/product.interface';
import { ProductGateway } from 'src/product/rest/product.gateway';

@Injectable()
export class UpdateProductInventory {
  constructor(private productGateway: ProductGateway) {}

  async updateProductsInventory(
    tenantID: string,
    products: ProductInterface[],
    isSum?: string,
  ): Promise<any> {
    try {
      for (let i = 0; i < products.length; i++) {
        await this.productGateway.putProductInventory(
          products[i].id,
          Number(products[i].amount),
          tenantID,
          isSum,
        );
      }

      return { message: 'Product inventories updated successfully' };
    } catch (error) {
      throw error;
    }
  }
}
