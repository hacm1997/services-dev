"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseExtraInfo(extraInfoString) {
    const cleanedExtraInfo = extraInfoString.slice(1, -1);
    const unescapedExtraInfo = cleanedExtraInfo.replace(/\\"/g, '"');
    const extraInfoObject = JSON.parse(unescapedExtraInfo);
    return extraInfoObject;
}
exports.default = parseExtraInfo;
//# sourceMappingURL=parseToJson.js.map