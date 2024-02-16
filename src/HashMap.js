import { LinkedList } from './LinkedList';

export class HashMap {
  table = [
    null,
    null,
    null,
    (() => {
      const list = new LinkedList();
      list.append('first key', 'first value');
      list.append('second key', 'old value');
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
    let index = this.hash(key);

    let curBucket = this.table[index];

    if (curBucket === null) {
      this.table[index] = new LinkedList().append(key, value);
      return this.table;
    }

    let hasKey = curBucket.contains(key);
    if (curBucket && hasKey) {
      const nodeIndex = curBucket.find(key);
      curBucket.updateValue(nodeIndex, value);
      return this.table;
    } else {
      // TODO: if list does not contain key -> append new node to end of list
    }
  }
}

let myHash = new HashMap();
console.log(myHash.set('second key', 'new value'));
