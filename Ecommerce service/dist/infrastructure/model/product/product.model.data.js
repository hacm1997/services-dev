"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModelData = void 0;
class ProductModelData {
    constructor(tenantID, sid, name, price, createdAt, status, image, description, extraInfo, inventory) {
        this._tenantID = tenantID;
        this._sid = sid;
        this._name = name;
        this._price = price;
        this._createdAt = createdAt;
        this._status = status;
        this._image = image;
        this._description = description;
        this._extraInfo = extraInfo;
        this._inventory = inventory;
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
    get image() {
        return this._image;
    }
    get description() {
        return this._description;
    }
    get price() {
        return this._price;
    }
    get createdAt() {
        return this._createdAt;
    }
    get status() {
        return this._status;
    }
    get extraInfo() {
        return this._extraInfo;
    }
    get inventory() {
        return this._inventory;
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
    set image(image) {
        this._image = image;
    }
    set description(description) {
        this._description = description;
    }
    set price(price) {
        this._price = price;
    }
    set createdAt(createdAt) {
        this._createdAt = createdAt;
    }
    set status(status) {
        this._status = status;
    }
    set extraInfo(extraInfo) {
        this._extraInfo = extraInfo;
    }
    set inventory(inventory) {
        this._inventory = inventory;
    }
    getItem() {
        const item = {
            pid: { S: this._tenantID },
            sid: { S: this._sid },
            name: { S: this._name },
            price: { N: this._price },
            createdAt: { S: this._createdAt },
            status: { S: this._status },
        };
        if (this._image) {
            item.image = { S: this._image };
        }
        if (this._extraInfo) {
            item.extraInfo = { S: JSON.stringify(this._extraInfo) };
        }
        if (this._description) {
            item.description = { S: this._description };
        }
        if (this._inventory) {
            item.inventory = { N: this._inventory };
        }
        return item;
    }
}
exports.ProductModelData = ProductModelData;
//# sourceMappingURL=product.model.data.js.map