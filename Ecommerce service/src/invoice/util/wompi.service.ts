import { Injectable } from '@nestjs/common';
import { InvoiceGateway } from '../rest/invoice.gateway';
import { UpdateProductInventory } from './update-invenory';
import { CreateCustomerFromInvoice } from 'src/client/util/createCustomerFromInvoice';
import { createHash } from 'crypto';
import { InvoiceModel } from '../data/invoice.model';
import axios from 'axios';
import {
  CANCEL_STATUS,
  FAILED_STATUS,
  PAID_STATUS,
  WOMPI_STATUS,
} from './constans';

@Injectable()
export class WompiService {
  constructor(
    private invoiceGateway: InvoiceGateway,
    private updateProductInventory: UpdateProductInventory,
    private createCustomer: CreateCustomerFromInvoice,
  ) {}

  public async generteUniqueCode(): Promise<string> {
    const caracteres =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    let codigo = '';

    for (let i = 0; i < 32; i++) {
      const caracterAleatorio = caracteres.charAt(
        Math.floor(Math.random() * caracteres.length),
      );
      codigo += caracterAleatorio;
    }

    return codigo;
  }

  public async encodeSignature(datos: string): Promise<string> {
    const encondedText: Buffer = Buffer.from(datos, 'utf-8');
    const hashHex: string = createHash('sha256')
      .update(encondedText)
      .digest('hex');
    return hashHex;
  }

  public async generateSignature(
    currency: string,
    price: number | string,
    w_integrity: string,
  ): Promise<any> {
    const uniqueCodeRef = await this.generteUniqueCode();
    const _currency = currency ? currency.toUpperCase() : currency;
    const amountInCents = price
      ? (Number(price) * 100).toString()
      : (Number(price) * 100).toString();
    const _referenceCode = uniqueCodeRef;

    const datosParaFirma = `${_referenceCode}${amountInCents.toString()}${_currency}${w_integrity}`;
    const signature: string = await this.encodeSignature(datosParaFirma);
    return { signature: signature, uniqueCodeRef: uniqueCodeRef };
  }

  public async wompiResponse(
    invoiceDto: InvoiceModel,
    tenantID: string,
    referenceID: string,
    request: Request,
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const wompiUrlResponse = process.env.APP_WOMPI_CONSULT as string;
      console.log('wompi success');
      try {
        axios
          .get(`${wompiUrlResponse}/${referenceID}`)
          .then(async (response) => {
            if (response.data.data.status === WOMPI_STATUS.approved) {
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
              response.data.data.status === WOMPI_STATUS.declined ||
              response.data.data.status === WOMPI_STATUS.voided ||
              response.data.data.status === WOMPI_STATUS.error
            ) {
              const setStatus =
                response.data.data.status === WOMPI_STATUS.declined
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
