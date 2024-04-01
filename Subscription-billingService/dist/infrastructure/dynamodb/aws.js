"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const env_1 = require("../../env");
env_1.default.NODE_ENV === "development"
    ? aws_sdk_1.default.config.update({
        region: env_1.default.dynamodb.region,
        credentials: {
            accessKeyId: env_1.default.dynamodb.accessKeyId,
            secretAccessKey: env_1.default.dynamodb.secretAccessKey,
        },
    })
    : aws_sdk_1.default.config.update({ region: env_1.default.dynamodb.region });
exports.default = aws_sdk_1.default;
//# sourceMappingURL=aws.js.map