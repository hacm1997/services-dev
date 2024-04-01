"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TUUID = void 0;
const uuid_1 = require("uuid");
class TUUID {
    static generateUID(group) {
        return `${group}-${this.generate()}`;
    }
    static generate() {
        return (0, uuid_1.v4)();
    }
}
exports.TUUID = TUUID;
//# sourceMappingURL=TUUID.js.map