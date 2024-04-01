import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerUsecase } from '../rest/customer.usecase';
import { FilterCustomerOptions } from '../util/customer.interfaces';
import getCookies from 'src/common/interceptors/getCookies/cookies';

@Injectable()
export class CustomerFilters {
  constructor(private customerUseCase: CustomerUsecase) {}

  async searchCustomerFilters(
    request: Request,
    page?: number,
    pageSize?: number,
    options?: FilterCustomerOptions,
  ) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    try {
      const customer = await this.customerUseCase.getAllCustomerFilter(request);
      if (!customer || customer.length === 0) {
        throw new NotFoundException('Costomers not founds');
      }
      const parsedResult = customer.map((item) => {
        const extraInfo = JSON.parse(item.extraInfo);
        return { ...item, extraInfo };
      });
      const apllyFilters = await this.applyFilters(parsedResult, options);

      const totalPages = Math.ceil(apllyFilters.length / pageSize);

      if (page && (page < 1 || page > totalPages)) {
        throw new NotFoundException('Invalid page number');
      }
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResult = apllyFilters.slice(startIndex, endIndex);

      return {
        data: paginatedResult,
        totalPages: totalPages,
        currentPage: page,
      };
    } catch (error) {
      throw new NotFoundException(
        'Customers for ' + getTenantId + ' not found',
      );
    }
  }

  async applyFilters(filteredResult: any, options: FilterCustomerOptions) {
    let result = filteredResult;
    //General Filter
    if (options.email || options.city || options.id || options.customerName) {
      result = result.filter((item) => {
        const fullName = `${item.name} ${item.last_name}`;
        const result_fullName = fullName
          .toLowerCase()
          .includes(options.customerName);
        const idMatches = item.id.includes(options.id);
        const emailMatches = item.email.includes(options.email);
        const cityMatches = item.city.toLowerCase().includes(options.city);
        return emailMatches || cityMatches || idMatches || result_fullName;
      });
    }
    //Filter by date range
    if (options.startDate && options.endDate) {
      result = result.filter(
        (item) =>
          item.createdAt >= options.startDate &&
          item.createdAt <= options.endDate,
      );
    }
    return result;
  }
}
