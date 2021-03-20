import { List } from 'immutable';
import ArrayProxySnapshot from '../ArrayProxySnapshot';
import Snapshottable from '../Snapshottable';

export default class ArrayProxy implements Snapshottable<ArrayProxySnapshot> {
  private _primaryIndex = 0;
  private _secondaryIndex = 0;

  public array = new Array<number>();
  public onStep?: (snapshot: ArrayProxySnapshot) => void;

  public get primaryIndex(): number {
    return this._primaryIndex;
  }
  public set primaryIndex(value: number) {
    const previousIndex = this._primaryIndex;
    this._primaryIndex = value;
    this.onStep?.(
      this.makeSnapshot(
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
      this.makeSnapshot(
        `Changed secondary index from ${previousIndex} to ${this._secondaryIndex}.`,
      ),
    );
  }

  public swap(): void {
    [this.array[this._secondaryIndex], this.array[this._primaryIndex]] = [
      this.array[this._primaryIndex],
      this.array[this._secondaryIndex],
    ];
    this.onStep?.(
      this.makeSnapshot(
        `Swapped item at ${this._secondaryIndex} with item at ${this._primaryIndex}.`,
      ),
    );
  }
  public compare(): number {
    this.onStep?.(
      this.makeSnapshot(
        `Compared item at ${this._secondaryIndex} with item at ${this._primaryIndex}.`,
      ),
    );

    if (this.array[this._primaryIndex] > this.array[this._secondaryIndex]) {
      return 1;
    }
    if (this.array[this._primaryIndex] < this.array[this._secondaryIndex]) {
      return -1;
    }
    return 0;
  }
  makeSnapshot(description?: string): ArrayProxySnapshot {
    return new ArrayProxySnapshot({
      array: List(this.array),
      primaryIndex: this._primaryIndex,
      secondaryIndex: this._secondaryIndex,
      description: description ?? '',
    });
  }
}
