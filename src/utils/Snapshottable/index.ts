import Snapshot from '../Snapshot';

export default interface Snapshottable<T extends Snapshot> {
  makeSnapshot(): T;
}
