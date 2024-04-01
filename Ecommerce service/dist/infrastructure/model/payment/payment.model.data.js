"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModelData = void 0;
class PaymentModelData {
    constructor(tenantID, customer, key_code, createdAt, extraInfo) {
        this._tenantID = tenantID;
        this._customer = customer;
        this._key_code = key_code;
        this._createdAt = createdAt;
        this._extraInfo = extraInfo;
    }
    get tenantID() {
        return this._tenantID;
    }
    get customer() {
        return this._customer;
    }
    get key_code() {
        return this._key_code;
    }
    get createAt() {
        return this._createdAt;
    }
    get extraInfo() {
        return this._extraInfo;
    }
    set tenantID(value) {
        this._tenantID = value;
    }
    set customer(value) {
        this._customer = value;
    }
    set key_code(value) {
        this._key_code = value;
    }
    set createdAt(value) {
        this._createdAt = value;
    }
    set extraInfo(value) {
        this._extraInfo = value;
    }
    getItem() {
        const item = {
            pid: { S: this._tenantID },
            sid: { S: this._customer },
            key_code: { S: this._key_code },
            createdAt: { S: JSON.stringify(this._createdAt) },
            extraInfo: { S: JSON.stringify(this._extraInfo) ?? '' },
        };
        return item;
    }
}
exports.PaymentModelData = PaymentModelData;
//# sourceMappingURL=payment.model.data.js.map