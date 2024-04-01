"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModelData = void 0;
class CustomerModelData {
    constructor(tenantID, sid, name, last_name, email, phone, city, address, createdAt, extraInfo) {
        this._tenantID = tenantID;
        this._sid = sid;
        this._name = name;
        this._last_name = last_name;
        this._email = email;
        this._phone = phone;
        this._city = city;
        this._address = address;
        this._createdAt = createdAt;
        this._extraInfo = extraInfo;
    }
    get tenantID() {
        return this._tenantID;
    }
    get sid() {
        return this._sid;
    }
    get name() {
        return this._name;
    }
    get last_name() {
        return this._last_name;
    }
    get email() {
        return this._email;
    }
    get phone() {
        return this._phone;
    }
    get city() {
        return this._city;
    }
    get address() {
        return this._address;
    }
    get createdAt() {
        return this._createdAt;
    }
    get extraInfo() {
        return this._extraInfo;
    }
    set tenantID(value) {
        this._tenantID = value;
    }
    set sid(value) {
        this._sid = value;
    }
    set name(name) {
        this._name = name;
    }
    set last_name(last_name) {
        this._last_name = last_name;
    }
    set email(email) {
        this._email = email;
    }
    set phone(phone) {
        this._phone = phone;
    }
    set city(city) {
        this._city = city;
    }
    set address(address) {
        this._address = address;
    }
    set createdAt(createdAt) {
        this._createdAt = createdAt;
    }
    set extraInfo(extraInfo) {
        this._extraInfo = extraInfo;
    }
    getItem() {
        const item = {
            pid: { S: this._tenantID },
            sid: { S: this._sid },
            name: { S: this._name },
            last_name: { S: this._last_name },
            email: { S: this._email },
            phone: { N: this._phone },
            city: { S: this._city },
            address: { S: this._address },
            createdAt: { S: this._createdAt },
        };
        if (this._extraInfo) {
            item.extraInfo = { S: JSON.stringify(this._extraInfo) };
        }
        return item;
    }
}
exports.CustomerModelData = CustomerModelData;
//# sourceMappingURL=customer.model.data.js.map