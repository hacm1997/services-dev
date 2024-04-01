"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySQLFilterBuilder = void 0;
const env_1 = require("../../env");
class QuerySQLFilterBuilder {
    constructor() {
        this.query = `SELECT * FROM ${env_1.default.opensearch.index ?? 'booking-failed'} `;
        this.filters = [];
        this.params = [];
        this.values = [];
        this.joins = [];
        this.operators = [];
    }
    addFilter(filter, value, operator, join = 'AND') {
        this.filters.push(filter);
        this.values.push(value);
        this.joins.push(join);
        this.operators.push(operator);
    }
    build() {
        let sql = this.query;
        let i = 0;
        for (const filter of this.filters) {
            if (i === 0) {
                sql += ` WHERE ${filter} ${this.operators[i]} ${this.values[i]}`;
            }
            else {
                sql += ` ${this.joins[i]} ${filter} ${this.operators[i]} ${this.values[i]}`;
            }
            this.params.push(this.values[i]);
            i++;
        }
        return sql;
    }
    getParams() {
        return this.params;
    }
}
exports.QuerySQLFilterBuilder = QuerySQLFilterBuilder;
//# sourceMappingURL=queryFilters.js.map