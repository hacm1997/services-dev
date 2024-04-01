"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
async function paginationFunction(data, page, pageSize) {
    const totalPages = Math.ceil(data.length / pageSize);
    if (page && (page < 1 || page > totalPages)) {
        throw new common_1.NotFoundException('Invalid page number');
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResult = data.slice(startIndex, endIndex);
    return {
        data: paginatedResult,
        totalPages: totalPages,
        currentPage: page,
    };
}
exports.default = paginationFunction;
//# sourceMappingURL=pagination.js.map