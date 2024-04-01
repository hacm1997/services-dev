import axios from 'axios';
import { InvoiceModel } from '../data/invoice.model';
import {
  CANCEL_STATUS,
  FAILED_STATUS,
  PAID_STATUS,
  StatusEpayco,
} from './constans';
import { UpdateProductInventory } from './update-invenory';
import { Injectable } from '@nestjs/common';
import { InvoiceGateway } from '../rest/invoice.gateway';
import { CreateCustomerFromInvoice } from 'src/client/util/createCustomerFromInvoice';

@Injectable()
export class EpaycoService {
  constructor(
    private invoiceGateway: InvoiceGateway,
    private updateProductInventory: UpdateProductInventory,
    private createCustomer: CreateCustomerFromInvoice,
  ) {}
  async epaycoResponse(
    invoiceDto: InvoiceModel,
    tenantID: string,
    reference: string,
    request: Request,
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const epaycoUrl = process.env.EPAYCO_SEARCH_REFERENCE as string;
      console.log('epayco success');
      try {
        axios
          .get(`${epaycoUrl}/${reference}`)
          .then(async (res) => {
            if (res.data.data.x_response === StatusEpayco.success) {
              await this.invoiceGateway.putInvoiceStatus(
                invoiceDto.invoice_code,
                PAID_STATUS,
                tenantID,
              );
              await this.updateProductInventory.updateProductsInventory(
                tenantID,
                invoiceDto.products,
                'false',
              );
              await this.createCustomer.saveCustomer(
                invoiceDto.customer,
                request,
                tenantID,
                invoiceDto.products,
                invoiceDto.total,
              );
              resolve('success');
            } else if (
              res.data.data.x_response === StatusEpayco.declined ||
              res.data.data.x_response === StatusEpayco.failed
            ) {
              const setStatus =
                res.data.data.x_response === StatusEpayco.declined
                  ? CANCEL_STATUS
                  : FAILED_STATUS;
              await this.invoiceGateway.putInvoiceStatus(
                invoiceDto.invoice_code,
                setStatus,
                tenantID,
              );
              await this.updateProductInventory.updateProductsInventory(
                tenantID,
                invoiceDto.products,
                'false',
              );
              resolve('success');
            } else {
              resolve('pending');
            }
          })
          .catch((err) => {
            console.log(
              'No se encontró la referencia de pago o hubo un error',
              err,
            );
            reject('not found');
          });
      } catch (error) {
        console.log(error);
      }
    });
  }
}
