import ArrayProxyStep from '../ArrayProxyStep';

export default class ArrayProxy {
  private _primaryIndex = 0;
  private _secondaryIndex = 0;
  private _array: readonly number[];

  public onStep: ((state: ArrayProxyStep) => void) | undefined;

  public get primaryIndex(): number {
    return this._primaryIndex;
  }
  public set primaryIndex(value: number) {
    const previousIndex = this._primaryIndex;
    this._primaryIndex = value;
    this.onStep?.(
      new ArrayProxyStep(
        this._array,
        this._primaryIndex,
        this._secondaryIndex,
        `Changed primary index from ${previousIndex} to ${this._primaryIndex}.`,
      ),
    );
  }

  public get secondaryIndex(): number {
    return this._secondaryIndex;
  }
  public set secondaryIndex(value: number) {
    const previousIndex = this._secondaryIndex;
    this._secondaryIndex = value;
    this.onStep?.(
      new ArrayProxyStep(
        this._array,
        this._primaryIndex,
        this._secondaryIndex,
        `Changed secondary index from ${previousIndex} to ${this._secondaryIndex}.`,
      ),
    );
  }

  public get array(): readonly number[] {
    return this._array;
  }

  public get currentState(): ArrayProxyStep {
    return new ArrayProxyStep(
      this._array,
      this._primaryIndex,
      this._secondaryIndex,
      'Current state...',
    );
  }

  public constructor(array: readonly number[]) {
    this._array = array;
  }
  public swap(): void {
    const newArray = this._array.slice();
    [newArray[this._secondaryIndex], newArray[this._primaryIndex]] = [
      newArray[this._primaryIndex],
      newArray[this._secondaryIndex],
    ];
    this._array = newArray;
    this.onStep?.(
      new ArrayProxyStep(
        this._array,
        this._primaryIndex,
        this._secondaryIndex,
        `Swapped item at ${this._secondaryIndex} with item at ${this._primaryIndex}.`,
      ),
    );
  }
  public compare(): number {
    this.onStep?.(
      new ArrayProxyStep(
        this._array,
        this._primaryIndex,
        this._secondaryIndex,
        `Compared item at ${this._secondaryIndex} with item at ${this._primaryIndex}.`,
      ),
    );

    if (this._array[this._primaryIndex] > this._array[this._secondaryIndex]) {
      return 1;
    }
    if (this._array[this._primaryIndex] < this._array[this._secondaryIndex]) {
      return -1;
    }
    return 0;
  }
  public edit(
    array: readonly number[] | undefined,
    primaryIndex: number | undefined,
    secondaryIndex: number | undefined,
    description: string,
  ): void {
    if (array !== undefined) this._array = array;
    if (primaryIndex !== undefined) this._primaryIndex = primaryIndex;
    if (secondaryIndex !== undefined) this._secondaryIndex = secondaryIndex;
    this.onStep?.(
      new ArrayProxyStep(
        this._array,
        this._primaryIndex,
        this._secondaryIndex,
        description,
      ),
    );
  }
}
