import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductUsecase } from '../rest/product.usecase';
import { detecteDiscountProducts } from './discount.service';

export interface FilterOptions {
  freeShipping?: boolean;
  discount?: boolean;
  availableShipping?: boolean;
  availablePickup?: boolean;
  minPrice?: number;
  maxPrice?: number;
  isNew?: boolean;
  isBest?: boolean;
  orderPrice?: boolean;
  disponibility?: boolean;
  categoriFilter?: string;
  sortBy?: string;
  keyword?: string;
  productType?: string;
}

@Injectable()
export class GeneralFilterClass {
  constructor(private productUseCase: ProductUsecase) {}

  async filterUnion(filteredResult: any, options: FilterOptions) {
    let result = filteredResult;
    // filtro rango de precio
    if (options.minPrice !== undefined && options.maxPrice !== undefined) {
      result = result.filter(
        (item) =>
          item.price >= options.minPrice && item.price <= options.maxPrice,
      );
    }
    // filtro productos con descuentos
    if (Boolean(options.discount) === true) {
      result = result.filter((item) => item.price_discount > 0);
    }
    // filtro productos disponible para envíos o recogida en tienda
    if (options.availableShipping) {
      result = result.filter(
        (item) => item.extraInfo.available_shipping === true,
      );
    }
    if (options.availablePickup) {
      result = result.filter(
        (item) => item.extraInfo.available_pickup === true,
      );
    }
    // filtro productos con envío gratis
    if (options.freeShipping) {
      result = result.filter((item) => item.extraInfo.free_shipping === true);
    }
    // filtro productos destacados
    if (options.isBest) {
      result = result.filter((item) => item.extraInfo.isBest === true);
    }
    // filtros productos nuevos
    if (options.isNew) {
      result = result.filter((item) => item.extraInfo.isNew === true);
    }
    // filtro productos por categorías
    if (options.categoriFilter) {
      result = result.filter((item) =>
        item.extraInfo.categories.includes(options.categoriFilter),
      );
    }
    // Filtro de mayor a menor precio
    if (options.sortBy === 'desc') {
      result = result.sort((a, b) => b.price - a.price);
    }
    // Filtro de menor a mayor precio
    if (options.sortBy === 'asc') {
      result = result.sort((a, b) => a.price - b.price);
    }
    // Filtro por keywords
    if (options.keyword) {
      result = result.filter((item) =>
        item.extraInfo.keywords.some((keyword) =>
          keyword.toLowerCase().includes(options.keyword),
        ),
      );
    }
    // Filtro por product type
    if (options.productType) {
      result = result.filter((item) =>
        item.extraInfo.product_type.includes(options.productType),
      );
    }
    return result;
  }

  async filterForFilters(
    request: Request,
    tenant: string,
    status: string,
    sentence: string,
    options?: FilterOptions,
  ) {
    try {
      const products = await this.productUseCase.getAllProducts(request);
      const discountProducts = products.map((item) =>
        detecteDiscountProducts(item),
      );
      if (!discountProducts || discountProducts.length === 0) {
        throw new NotFoundException('Product not found');
      }

      const parsedResult = discountProducts.map((item) => {
        const extraInfo = JSON.parse(item.extraInfo);
        return { ...item, extraInfo };
      });
      const filteredResult = parsedResult
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .filter((item) => {
          if (sentence) {
            const productTypeMatches =
              item.extraInfo.product_type.includes(sentence);

            const statusMatches = !status || item.status === status;

            return productTypeMatches && statusMatches;
          } else {
            const statusMatches = !status || item.status === status;

            return statusMatches;
          }
        });
      const apllyFilters = await this.filterUnion(filteredResult, options);

      return apllyFilters;
    } catch {
      throw new NotFoundException(
        'Products or category for ' + tenant + ' not found',
      );
    }
  }
}
