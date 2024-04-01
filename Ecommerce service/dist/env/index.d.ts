declare const env: {
    NODE_ENV: string;
    PORT: string;
    HOST: string;
    dynamodb: {
        region: string;
        endpoint: string;
        apiVersion: string;
        tableName: string;
        accessKeyId: string;
        secretAccessKey: string;
    };
    opensearch: {
        region: string;
        endpoint: string;
        index: string;
    };
    frontend_urls: string[];
};
export default env;
