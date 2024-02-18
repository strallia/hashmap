import { LinkedList } from './LinkedList';

export class HashMap {
  table = [
    null,
    null,
    null,
    null,
    null,
    null,
    (() => {
      const list = new LinkedList();
      list.append('key1', 'value1');
      list.append('key2', 'value2');
      return list;
    })(),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  bucketsLength = 16;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = Math.floor((primeNumber * hashCode + key.charCodeAt(i)) % 16);
    }

    if (hashCode < 0 || hashCode >= this.bucketsLength) {
      throw new Error('Trying to access index out of bound');
    }

    return hashCode;
  }

  set(key, value) {
    // TODO: grow table size when load factor taken into account
    let index = this.hash(key);

    let curBucket = this.table[index];
    if (curBucket === null) {
      let newList = new LinkedList();
      newList.append(key, value);
      this.table[index] = newList;
    } else if (curBucket && curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      curBucket.updateValue(nodeIndex, value);
    } else {
      curBucket.append(key, value);
    }

    return this.table;
  }
}

let myHash = new HashMap();
console.log(myHash.set('third key', 'new value'));
