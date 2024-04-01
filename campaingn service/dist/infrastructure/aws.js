"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
process.env.ENV_EXEC_CONF === 'development'
    ? aws_sdk_1.default.config.update({
        region: 'us-east-1',
    })
    : aws_sdk_1.default.config.update({ region: 'us-east-1' });
exports.default = aws_sdk_1.default;
//# sourceMappingURL=aws.js.map