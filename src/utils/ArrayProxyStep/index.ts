export default class ArrayProxyStep {
  public readonly array: readonly number[];
  public readonly primaryIndex: number;
  public readonly secondaryIndex: number;
  public readonly description: string;

  public constructor(
    array: readonly number[],
    primaryIndex: number,
    secondaryIndex: number,
    description: string,
  ) {
    this.array = array;
    this.primaryIndex = primaryIndex;
    this.secondaryIndex = secondaryIndex;
    this.description = description;
  }
}
