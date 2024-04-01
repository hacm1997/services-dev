import { v4 } from "uuid";
export class TUUID {
  public static generateUID(group: string): string {
    return `${group}-${this.generate()}`;
  }

  private static generate(): string {
    return v4();
  }
}
