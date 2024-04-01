"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasDecode = exports.HasEncode = void 0;
async function HasEncode(data) {
    const buffer = Buffer.from(data);
    return buffer.toString('base64');
}
exports.HasEncode = HasEncode;
async function HasDecode(data) {
    const buffer = Buffer.from(data, 'base64');
    return buffer.toString();
}
exports.HasDecode = HasDecode;
//# sourceMappingURL=cifrado.service.js.map