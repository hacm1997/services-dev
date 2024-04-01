"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opensearch_1 = require("@opensearch-project/opensearch");
const aws_1 = require("@opensearch-project/opensearch/aws");
const index_1 = require("../../env/index");
const aws_2 = require("../dynamodb/aws");
const options = {
    ...(index_1.default.NODE_ENV !== 'development'
        ? (0, aws_1.AwsSigv4Signer)({
            region: index_1.default.opensearch.region ?? 'us-east-2',
            getCredentials: async () => await new Promise((resolve, reject) => {
                aws_2.default.config.getCredentials((err, credentials) => {
                    if (err === null && credentials === null) {
                        reject(err);
                    }
                    else {
                        resolve(credentials);
                    }
                });
            }),
        })
        : {}),
    node: index_1.default.opensearch.endpoint,
};
const client = new opensearch_1.Client(options);
exports.default = client;
//# sourceMappingURL=index.js.map