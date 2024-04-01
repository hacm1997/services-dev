import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductUsecase } from '../rest/product.usecase';
import getCookies from 'src/common/interceptors/getCookies/cookies';
import { Categories } from '../rest/categories';
import { FilterOptions, GeneralFilterClass } from './generalFilter';
import { detecteDiscountProducts } from './discount.service';

@Injectable()
export class OfferingRules {
  constructor(
    private productUseCase: ProductUsecase,
    private generalFIlterClass: GeneralFilterClass,
  ) {}

  async getProductsParams(
    status: string,
    request: Request,
    isNew?: boolean,
    isBest?: boolean,
    page?: number,
    pageSize?: number,
  ) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);

    try {
      const products = await this.productUseCase.getAllProducts(request);
      // const products = await this.productUseCase.getAllProducts(request);
      const discountProducts = products.map((item) =>
        detecteDiscountProducts(item),
      );
      //console.log('discountProducts => ', discountProducts);
      if (!discountProducts || discountProducts.length === 0) {
        throw new NotFoundException('Product not found');
      }

      const parsedResult = discountProducts.map((item) => {
        const extraInfo = JSON.parse(item.extraInfo);
        return { ...item, extraInfo };
      });

      let filteredResult: any[];

      if (isNew) {
        filteredResult = parsedResult
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .filter((item) => {
            if (Boolean(item.extraInfo.isNew) === Boolean(isNew)) {
              const statusMatches = !status || item.status === status;
              return statusMatches;
            }
          });
      }
      if (isBest) {
        filteredResult = parsedResult
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .filter((item) => {
            if (Boolean(item.extraInfo.isBest) === Boolean(isBest)) {
              const statusMatches = !status || item.status === status;
              return statusMatches;
            }
          });
      }
      const totalPages = Math.ceil(filteredResult.length / pageSize);

      if (page && (page < 1 || page > totalPages)) {
        throw new NotFoundException('Invalid page number');
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResult = filteredResult.slice(startIndex, endIndex);

      return {
        data: paginatedResult,
        totalPages: totalPages,
        currentPage: page,
      };
    } catch {
      throw new NotFoundException(
        'Products or category for ' + getTenantId + ' not found',
      );
    }
  }

  async getProductCategories(
    categories: Categories,
    request: Request,
    city: string,
    status: string,
    minPrice?: number,
    maxPrice?: number,
    freeShipping?: number | boolean,
    page?: number,
    pageSize?: number,
  ) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    try {
      const products = await this.productUseCase.getProductsByParams(
        request,
        city,
        status,
        minPrice,
        maxPrice,
        freeShipping,
      );
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

      let filteredResult: any[];

      if (
        categories.list_categories !== undefined &&
        categories.list_categories.length > 0
      ) {
        filteredResult = parsedResult
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .filter((item) => {
            const categoryMatches = categories.list_categories.some(
              (category) => item.extraInfo.categories.includes(category),
            );

            const statusMatches = !status || item.status === status;

            return categoryMatches && statusMatches;
          });
      } else {
        filteredResult = discountProducts
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .filter((item) => {
            // Agregar filtro de status si se proporciona
            const statusMatches = !status || item.status === status;

            return statusMatches;
          });
      }

      const totalPages = Math.ceil(filteredResult.length / pageSize);

      if (page && (page < 1 || page > totalPages)) {
        throw new NotFoundException('Invalid page number');
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResult = filteredResult.slice(startIndex, endIndex);

      return {
        data: paginatedResult,
        totalPages: totalPages,
        currentPage: page,
      };
    } catch {
      throw new NotFoundException(
        'Products or category for ' + getTenantId + ' not found',
      );
    }
  }

  async getByCategories(
    categories: Categories,
    request: Request,
    page?: number,
    pageSize?: number,
    status?: string,
    name?: string,
  ) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);

    try {
      const products = await this.productUseCase.getAllProducts(request);
      // const products = await this.productUseCase.getAllProducts(request);
      const discountProducts = products.map((item) =>
        detecteDiscountProducts(item),
      );
      //console.log('discountProducts => ', discountProducts);
      if (!discountProducts || discountProducts.length === 0) {
        throw new NotFoundException('Product not found');
      }

      const parsedResult = discountProducts.map((item) => {
        const extraInfo = JSON.parse(item.extraInfo);
        return { ...item, extraInfo };
      });
      //console.log('parsed result => ', parsedResult);

      let filteredResult: any[];

      if (
        categories.list_categories !== undefined &&
        categories.list_categories.length > 0
      ) {
        filteredResult = parsedResult
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .filter((item) => {
            const categoryMatches = categories.list_categories.some(
              (category) => item.extraInfo.categories.includes(category),
            );
            const statusMatches = !status || item.status === status;

            return categoryMatches && statusMatches;
          });
      } else {
        filteredResult = discountProducts
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .filter((item) => {
            if (name !== undefined && name.length > 2) {
              const someName = item.name
                .toLowerCase()
                .includes(name.toLowerCase());
              // Agregar filtro de status si se proporciona
              const statusMatches = !status || item.status === status;

              return statusMatches && someName;
            } else {
              // Agregar filtro de status si se proporciona
              const statusMatches = !status || item.status === status;

              return statusMatches;
            }
          });
      }

      const totalPages = Math.ceil(filteredResult.length / pageSize);

      if (page && (page < 1 || page > totalPages)) {
        throw new NotFoundException('Invalid page number');
      }
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResult = filteredResult.slice(startIndex, endIndex);

      return {
        data: paginatedResult,
        totalPages: totalPages,
        currentPage: page,
      };
    } catch {
      throw new NotFoundException(
        'Products or category for ' + getTenantId + ' not found',
      );
    }
  }

  async searchFilter(status: string, textSearch: string, request: Request) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);

    try {
      const products = await this.productUseCase.getAllProducts(request);
      // const products = await this.productUseCase.getAllProducts(request);
      const discountProducts = products.map((item) =>
        detecteDiscountProducts(item),
      );
      //console.log('discountProducts => ', discountProducts);
      if (!discountProducts || discountProducts.length === 0) {
        throw new NotFoundException('Product not found');
      }

      const parsedResult = discountProducts.map((item) => {
        const extraInfo = JSON.parse(item.extraInfo);
        return { ...item, extraInfo };
      });

      let filteredResult: any[];

      if (textSearch.length > 0) {
        filteredResult = parsedResult
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .filter((item) => {
            const someName = item.name
              .toLowerCase()
              .includes(textSearch.toLowerCase());

            const someProductType = item.extraInfo.product_type
              .toLowerCase()
              .includes(textSearch.toLowerCase());

            const tagToString = item.extraInfo.categories.toString();

            const someProductTag = tagToString.includes(
              textSearch.toLowerCase(),
            );

            const statusMatches = !status || item.status === status;

            if (item.extraInfo.keywords) {
              const someKeywords = item.extraInfo.keywords.includes(textSearch);

              return (
                (someName ||
                  someProductType ||
                  someProductTag ||
                  someKeywords) &&
                statusMatches
              );
            } else {
              return (
                (someName || someProductType || someProductTag) && statusMatches
              );
            }
          });
      } else {
        filteredResult = discountProducts
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .filter((item) => {
            const statusMatches = !status || item.status === status;
            return statusMatches;
          });
      }
      return {
        data: filteredResult,
      };
    } catch {
      throw new NotFoundException(
        'Products or category for ' + getTenantId + ' not found',
      );
    }
  }

  async getDiscountProducts(
    status: string,
    request: Request,
    page?: number,
    pageSize?: number,
  ) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
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
          const isDiscount = item.price_discount != undefined;
          const statusMatches = !status || item.status === status;
          return statusMatches && isDiscount;
        });

      const totalPages = Math.ceil(filteredResult.length / pageSize);

      if (page && (page < 1 || page > totalPages)) {
        throw new NotFoundException('Invalid page number');
      }
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResult = filteredResult.slice(startIndex, endIndex);

      return {
        data: paginatedResult,
        totalPages: totalPages,
        currentPage: page,
      };
    } catch {
      throw new NotFoundException(
        'Products or category for ' + getTenantId + ' not found',
      );
    }
  }

  async generalFilters(
    status: string,
    request: Request,
    sentence: string,
    page?: number,
    pageSize?: number,
    options?: FilterOptions,
  ) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    let resultFilters: any[];

    try {
      const result = await this.generalFIlterClass.filterForFilters(
        request,
        getTenantId,
        status,
        sentence,
        options,
      );
      resultFilters = result;

      const totalPages = Math.ceil(resultFilters.length / pageSize);

      if (page && (page < 1 || page > totalPages)) {
        throw new NotFoundException('Invalid page number');
      }
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResult = resultFilters.slice(startIndex, endIndex);

      return {
        data: paginatedResult,
        totalPages: totalPages,
        currentPage: page,
      };
    } catch (error) {
      throw new NotFoundException(
        'Products or category for ' + getTenantId + ' not found',
      );
    }
  }
}
