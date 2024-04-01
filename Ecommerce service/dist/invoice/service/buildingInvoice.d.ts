import { ProductInterface } from '../data/product.interface';
import { ShippingInterface } from '../data/shipping.interface';
import { InvoiceModelDTO } from '../rest/invoice.model.dto';
import { ShippingGateway } from 'src/shipping/rest/shipping.gateway';
export declare class BuildingInvoice {
    generatorInvoiceCode(reference: string, separador?: string, separacion?: number): string;
    getProduct(invoiceDTO: InvoiceModelDTO): ProductInterface[];
    getShipping(tenantID: string, code: string, shippingGateway: ShippingGateway): Promise<ShippingInterface>;
    calculateTotalPrice(invoiceDTO: InvoiceModelDTO, tenantID: string, code: string, shippingGateway: ShippingGateway): Promise<{
        subtotal: number;
        subtotal_shipping: number;
        total_IVA: number;
    }>;
}
