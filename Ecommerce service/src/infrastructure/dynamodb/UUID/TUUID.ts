import { v4 } from 'uuid';
export class TUUID {
  public static generateUID(group: String): string {
    return `${group}-${this.generate()}`;
  }

  private static generate(): String {
    return v4();
  }
}
