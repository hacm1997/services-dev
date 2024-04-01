import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceUsecase } from '../rest/invoice.usecase';
import getCookies from 'src/common/interceptors/getCookies/cookies';
import { InvoiceModel } from '../data/invoice.model';
import { FilterInvoiceOptions } from '../util/invoice.interfaces';

@Injectable()
export class InvoiceFilters {
  constructor(private invoiceUseCase: InvoiceUsecase) {}

  async searchFiltersInvoice(
    request: Request,
    page?: number,
    pageSize?: number,
    options?: FilterInvoiceOptions,
  ) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);

    try {
      const invoices = await this.invoiceUseCase.getAllInvoices(request);
      if (!invoices || invoices.length === 0) {
        throw new NotFoundException('Invoices not found');
      }
      const apllyFilters = await this.applyFilters(invoices, options);

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
      throw new NotFoundException('Invoice for ' + getTenantId + ' not found');
    }
  }

  async applyFilters(filteredResult: any, options: FilterInvoiceOptions) {
    let result = filteredResult;

    //Filter by status invoice
    if (options.status) {
      result = result.filter(
        (item: InvoiceModel) => item.status === options.status,
      );
    }
    //Filter by date range
    if (options.startDate && options.endDate) {
      result = result.filter(
        (item: InvoiceModel) =>
          (item.createdAt >= options.startDate &&
            item.createdAt <= options.endDate) ||
          (item.createdAt.includes(options.startDate) &&
            item.createdAt.includes(options.endDate)),
      );
    }
    //Filter by id or code or customer name invoice
    if (options.customerName || options.id) {
      result = result.filter((item: InvoiceModel) => {
        if (item.customer) {
          const resulName = item.customer?.name
            .toLowerCase()
            .includes(options.customerName);
          const resulLastName = item.customer?.last_name
            .toLowerCase()
            .includes(options.customerName);
          const resulFullName =
            `${item.customer?.name} ${item.customer?.last_name}`
              .toLowerCase()
              .includes(options.customerName);
          const resulID = item.invoice_code.includes(options.id);
          return resulName || resulID || resulLastName || resulFullName;
        }
      });
    }
    //Filter by price range
    if (options.maxPrice && options.minPrice) {
      result = result.filter(
        (item: InvoiceModel) =>
          item.total >= options.minPrice && item.total <= options.maxPrice,
      );
    }
    return result;
  }
}
