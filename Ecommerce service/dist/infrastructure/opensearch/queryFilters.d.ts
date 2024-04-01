export declare class QuerySQLFilterBuilder {
    private readonly query;
    private readonly filters;
    private readonly params;
    private readonly values;
    private readonly joins;
    private readonly operators;
    constructor();
    addFilter(filter: string, value: string, operator: string, join?: string): void;
    build(): string;
    getParams(): string[];
}
