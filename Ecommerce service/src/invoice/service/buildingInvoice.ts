import { ProductInterface } from '../data/product.interface';
import { ShippingInterface } from '../data/shipping.interface';
import { InvoiceModelDTO } from '../rest/invoice.model.dto';
import { ShippingGateway } from 'src/shipping/rest/shipping.gateway';

export class BuildingInvoice {
  public generatorInvoiceCode(
    reference: string,
    separador = '-',
    separacion = 5,
  ) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigoFactura = '';

    for (let i = 0; i < 20; i++) {
      if (i > 0 && i % separacion === 0) {
        codigoFactura += separador;
      }
      const indice = Math.floor(Math.random() * caracteres.length);
      codigoFactura += caracteres.charAt(indice);
    }

    return codigoFactura;
  }

  public getProduct(invoiceDTO: InvoiceModelDTO) {
    const setProducts = invoiceDTO.products.map((item) => {
      const objectProducts: ProductInterface = {
        id: item.id,
        product_name: item.product_name,
        amount: item.amount,
        price: item.price,
        total_price: item.amount * item.price,
        details: item.details,
      };
      return objectProducts;
    });
    return setProducts;
  }

  public async getShipping(
    tenantID: string,
    code: string,
    shippingGateway: ShippingGateway,
  ) {
    try {
      const responseShipping = await shippingGateway.getShippingByCode(
        tenantID,
        code,
      );

      const result: ShippingInterface = {
        shipping_code: responseShipping[0].shipping_code,
        city: responseShipping[0].city,
        price: responseShipping[0].price,
      };
      // console.log('result => ', result);

      return result;
    } catch (error) {
      console.log(error);
      const result: ShippingInterface = {
        shipping_code: '',
        city: '',
        price: 0,
        neighborhood: '',
        postal_code: null,
      };
      return result;
    }
  }

  public async calculateTotalPrice(
    invoiceDTO: InvoiceModelDTO,
    tenantID: string,
    code: string,
    shippingGateway: ShippingGateway,
  ) {
    // get all products
    const products = this.getProduct(invoiceDTO);

    // get shipping info
    const shipping = await this.getShipping(tenantID, code, shippingGateway);

    // Calculate total price
    const subtotal = products.reduce(
      (acc, product) => acc + product.total_price,
      0,
    );

    const subtotal_shipping =
      products.reduce((acc, product) => acc + product.total_price, 0) +
      shipping?.price;

    const total = products.reduce((acc, product) => {
      if (product.details.iva !== undefined && product.details.iva !== null) {
        acc += product.total_price * (1 + product.details.iva / 100);
      } else {
        acc += product.total_price;
      }
      return acc;
    }, 0);

    console.log('sub total => ', subtotal);
    console.log('sub total => ', subtotal_shipping);
    console.log('total con iva => ', total);
    console.log('total con iva + envío => ', total + shipping?.price);

    return {
      subtotal: subtotal,
      subtotal_shipping: subtotal_shipping,
      total_IVA: total + shipping?.price,
    };
  }
}
