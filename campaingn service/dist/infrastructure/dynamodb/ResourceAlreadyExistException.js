"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceAlreadyExistException = void 0;
const common_1 = require("@nestjs/common");
class ResourceAlreadyExistException extends common_1.NotFoundException {
    constructor(body = 'Update already executed') {
        super(body);
        this.body = body;
    }
}
exports.ResourceAlreadyExistException = ResourceAlreadyExistException;
//# sourceMappingURL=ResourceAlreadyExistException.js.map