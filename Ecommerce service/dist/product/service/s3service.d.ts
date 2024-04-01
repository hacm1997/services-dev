export declare class S3Service {
    path: string;
    formdata: FormData;
    configFetchS3: {
        method: string;
        headers: {
            xsrfCookie: string;
            'Content-Type': string;
        };
        body: FormData;
    };
    upload(fileKey: any): Promise<any>;
}
