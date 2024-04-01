import env from '../../env';

export class QuerySQLFilterBuilder {
  private readonly query = `SELECT * FROM ${
    env.opensearch.index ?? 'booking-failed'
  } `;
  private readonly filters: string[] = [];
  private readonly params: string[] = [];
  private readonly values: string[] = [];
  private readonly joins: string[] = [];
  private readonly operators: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  addFilter(
    filter: string,
    value: string,
    operator: string,
    join = 'AND',
  ): void {
    this.filters.push(filter);
    this.values.push(value);
    this.joins.push(join);
    this.operators.push(operator);
  }

  build(): string {
    let sql = this.query;
    let i = 0;
    for (const filter of this.filters) {
      if (i === 0) {
        sql += ` WHERE ${filter} ${this.operators[i]} ${this.values[i]}`;
      } else {
        sql += ` ${this.joins[i]} ${filter} ${this.operators[i]} ${this.values[i]}`;
      }
      this.params.push(this.values[i]);
      i++;
    }
    return sql;
  }

  getParams(): string[] {
    return this.params;
  }
}
