"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCookies(request) {
    const tenantID = request?.xsrfcookie.split('=');
    return tenantID[1];
}
exports.default = getCookies;
//# sourceMappingURL=cookies.js.map