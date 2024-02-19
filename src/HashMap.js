import { LinkedList } from './LinkedList';

export class HashMap {
  table = [
    null,
    null,
    (() => {
      const list = new LinkedList();
      list.append('key1', 'value1');
      list.append('key2', 'value2');
      list.append('key3', 'value3');
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
    (() => {
      const list = new LinkedList();
      list.append('KEY1', 'value1');
      list.append('KEY2', 'value2');
      list.append('KEY3', 'value3');
      return list;
    })(),
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

  get(key) {
    let index = this.hash(key);
    let curBucket = this.table[index];

    if (curBucket && curBucket.contains(key)) {
      let nodeIndex = curBucket.find(key);
      return curBucket.at(nodeIndex).value;
    } else return null;
  }

  has(key) {
    let index = this.hash(key);
    let curBucket = this.table[index];
    return curBucket && curBucket.contains(key) ? true : false;
  }

  remove(key) {
    let index = this.hash(key);
    let curBucket = this.table[index];
    if (!curBucket || !curBucket.contains(key)) {
      return false;
    } else if (curBucket.contains(key)) {
      let nodeIndex = curBucket.find(key);
      curBucket.removeAt(nodeIndex);
      console.log(this.table);
      return true;
    }
  }

  length() {
    let totalNodes = 0;
    this.table.forEach((bucket) => {
      if (bucket) totalNodes += bucket.size();
    });
    return totalNodes;
  }

  clear() {
    const clearedTable = this.table.map(() => {
      return null;
    });
    return (this.table = clearedTable);
  }

  keys() {
    let filledBuckets = this.table.filter((bucket) => {
      return bucket !== null;
    });
    let keysArr = [];
    filledBuckets.forEach((list) => {
      let totalNodes = list.size();
      let curNodeIndex = 1;
      while (curNodeIndex <= totalNodes) {
        keysArr.push(list.at(curNodeIndex).key);
        curNodeIndex++;
      }
    });
    return keysArr;
  }

  values() {
    let filledBuckets = this.table.filter((bucket) => {
      return bucket !== null;
    });
    let valuesArr = [];
    filledBuckets.forEach((list) => {
      let totalNodes = list.size();
      let curNodeIndex = 1;
      while (curNodeIndex <= totalNodes) {
        valuesArr.push(list.at(curNodeIndex).value);
        curNodeIndex++;
      }
    });
    return valuesArr;
  }
}

let myHash = new HashMap();
console.log(myHash.values());
