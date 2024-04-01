"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingModelData = void 0;
class ShippingModelData {
    constructor(tenantID, shipping_code, city, price, extraInfo) {
        this._tenantID = tenantID;
        this._shipping_code = shipping_code;
        this._city = city;
        this._price = price;
        this._extraInfo = extraInfo;
    }
    get tenantID() {
        return this._tenantID;
    }
    get shipping_code() {
        return this._shipping_code;
    }
    get city() {
        return this._city;
    }
    get price() {
        return this._price;
    }
    get extraInfo() {
        return this._extraInfo;
    }
    set tenantID(value) {
        this._tenantID = value;
    }
    set shipping_code(value) {
        this._shipping_code = value;
    }
    set city(value) {
        this._city = value;
    }
    set price(value) {
        this._price = value;
    }
    set extraInfo(value) {
        this._extraInfo = value;
    }
    getItem() {
        const item = {
            pid: { S: this._tenantID },
            sid: { S: this._shipping_code },
            city: { S: this._city },
            price: { N: this._price },
        };
        if (this._extraInfo) {
            item.extraInfo = { S: JSON.stringify(this._extraInfo) };
        }
        return item;
    }
}
exports.ShippingModelData = ShippingModelData;
//# sourceMappingURL=shipping.model.data.js.map