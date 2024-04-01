import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerUsecase } from '../rest/customer.usecase';
import { CustomerInterface } from 'src/invoice/data/customer.interface';
import * as moment from 'moment';
import { CustomerModelDTO } from '../rest/customer.model.dto';
import { CUSTOMER_GROUP } from 'src/infrastructure/dynamodb/intializer/Constants';
import { ProductInterface } from 'src/invoice/data/product.interface';

@Injectable()
export class CreateCustomerFromInvoice {
  constructor(private customerUseCase: CustomerUsecase) {}

  async saveCustomer(
    customer: CustomerInterface,
    request: Request,
    tenant: string,
    products: ProductInterface[],
    total: number,
  ) {
    const currentDate = moment().subtract(5, 'hours');
    const getCustomerById = await this.customerUseCase.getAllCustomerByID(
      customer.id.toString(),
      request,
    );
    try {
      if (!getCustomerById || getCustomerById.length === 0) {
        const parsedResult = customer.details;
        const updatedDetails = {
          ...parsedResult,
          products: products,
          total: Number(total),
        };
        const initiCustomer = CustomerModelDTO.builderFromInvoice()
          .TENANTID(CUSTOMER_GROUP + '#' + tenant)
          .ID(customer.id.toString())
          .NAME(customer.name)
          .LAST_NAME(customer.last_name)
          .EMAIL(customer.email)
          .PHONE(customer.phone ? customer.phone : 0)
          .CITY(customer.details?.city ? customer.details?.city : '')
          .ADDRESS(customer.address ? customer.address : '')
          .CREATEDAT(currentDate.toISOString())
          .EXTRAINFO(updatedDetails)
          .build();
        const createCustomer = await this.customerUseCase.createCustomer(
          initiCustomer,
          request,
        );
        return createCustomer;
      } else {
        const parsedResult = getCustomerById.map((item) => {
          const extraInfo = JSON.parse(item.extraInfo);
          return { ...item, extraInfo };
        });
        const updatedDetails = {
          ...parsedResult[0].extraInfo,
          products: [...parsedResult[0].extraInfo.products, ...products],
          total: Number(parsedResult[0].extraInfo.total) + Number(total),
        };

        const initiCustomer = CustomerModelDTO.builderFromInvoice()
          .TENANTID(CUSTOMER_GROUP + '#' + tenant)
          .ID(parsedResult[0].id)
          .NAME(parsedResult[0].name)
          .LAST_NAME(parsedResult[0].last_name)
          .EMAIL(parsedResult[0].email)
          .PHONE(parsedResult[0].phone ? parsedResult[0].phone : 0)
          .CITY(
            parsedResult[0].extraInfo?.city
              ? parsedResult[0].extraInfo?.city
              : '',
          )
          .ADDRESS(parsedResult[0].address ? parsedResult[0].address : '')
          .CREATEDAT(currentDate.toISOString())
          .EXTRAINFO(updatedDetails)
          .build();
        const createCustomer = await this.customerUseCase.createCustomer(
          initiCustomer,
          request,
        );
        return createCustomer;
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Cannot create customer');
    }
  }
}
