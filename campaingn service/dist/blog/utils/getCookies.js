"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCookies(request) {
    if (request?.xsrfcookie) {
        const tenantID = request?.xsrfcookie.split('=');
        return tenantID[1];
    }
    else {
        return undefined;
    }
}
exports.default = getCookies;
//# sourceMappingURL=getCookies.js.map