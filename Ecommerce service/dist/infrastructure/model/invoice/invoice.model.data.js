"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceModelData = void 0;
class InvoiceModelData {
    constructor(tenantID, invoice_code, reference, createdAt, customer, products, shipping, iva, total, payment_method, status, extraInfo) {
        this._tenantID = tenantID;
        this._invoice_code = invoice_code;
        this._reference = reference;
        this._createdAt = createdAt;
        this._customer = customer;
        this._products = products;
        this._shipping = shipping;
        this._iva = iva;
        this._total = total;
        this._payment_method = payment_method;
        this._status = status;
        this._extraInfo = extraInfo;
    }
    get tenantID() {
        return this._tenantID;
    }
    get invoice_code() {
        return this._invoice_code;
    }
    get reference() {
        return this._reference;
    }
    get createdAt() {
        return this._createdAt;
    }
    get customer() {
        return this._customer;
    }
    get products() {
        return this._products;
    }
    get shipping() {
        return this._shipping;
    }
    get iva() {
        return this._iva;
    }
    get total() {
        return this._total;
    }
    get payment_method() {
        return this._payment_method;
    }
    get status() {
        return this._status;
    }
    get extraInfo() {
        return this._extraInfo;
    }
    set tenantID(value) {
        this._tenantID = value;
    }
    set invoice_code(value) {
        this._invoice_code = value;
    }
    set reference(value) {
        this._reference = value;
    }
    set createdAt(value) {
        this._createdAt = value;
    }
    set customer(value) {
        this._customer = value;
    }
    set products(value) {
        this._products = value;
    }
    set shipping(value) {
        this._shipping = value;
    }
    set iva(value) {
        this._iva = value;
    }
    set total(value) {
        this._total = value;
    }
    set payment_method(value) {
        this._payment_method = value;
    }
    set status(value) {
        this._status = value;
    }
    set extraInfo(value) {
        this._extraInfo = value;
    }
    getItem() {
        const item = {
            pid: { S: this._tenantID },
            sid: { S: this._invoice_code },
            reference: { S: this._reference },
            createdAt: { S: this._createdAt },
            customer: { S: JSON.stringify(this._customer) },
            products: { S: JSON.stringify(this._products) },
            shipping: { S: JSON.stringify(this._shipping) },
            iva: { N: this._iva },
            total: { N: this._total },
            payment_method: { S: this._payment_method },
            status: { S: this._status },
            extraInfo: { S: JSON.stringify(this._extraInfo) ?? '' },
        };
        return item;
    }
}
exports.InvoiceModelData = InvoiceModelData;
//# sourceMappingURL=invoice.model.data.js.map