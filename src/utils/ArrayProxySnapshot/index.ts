import { Record, List } from 'immutable';
import Snapshot from '../Snapshot';

export default class ArrayProxySnapshot
  extends Record({
    array: List<number>(),
    primaryIndex: 0,
    secondaryIndex: 0,
    description: '',
  })
  implements Snapshot {
  getDescription(): string {
    return this.description;
  }
}
