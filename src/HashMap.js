import { LinkedList } from './LinkedList';

export class HashMap {
  // example hash table
  table = [
    null,
    null,
    // example linked list with 3 nodes. Each node contains a hashCode, key,
    // value, and reference to next node.
    (() => {
      const list = new LinkedList();
      list.append(2, 'key1', 'value1');
      list.append(2, 'key2', 'value2');
      list.append(2, 'key3', 'value3');
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
      list.append(16, 'KEY1', 'value1');
      list.append(16, 'KEY2', 'value2');
      list.append(16, 'KEY3', 'value3');
      return list;
    })(),
  ];
  capacity = 16;
  loadFactor = 0.75;

  increaseCapacity() {
    /*
     * call this function when a collision occurs (ie when
     * adding node to filled bucket && you're not updating a key
     * thats already there).
     * if the number of filled buckets/capacity = loadFactor,
     * add a null bucket to table and update capacity size.
     */
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = Math.floor(
        (primeNumber * hashCode + key.charCodeAt(i)) % this.table.length,
      );
    }

    if (hashCode < 0 || hashCode >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }
    console.log(this.table.length);
    return hashCode;
  }

  set(key, value) {
    let hash = this.hash(key);

    let curBucket = this.table[hash];
    if (curBucket === null) {
      let newList = new LinkedList();
      newList.append(hash, key, value);
      this.table[hash] = newList;
    } else if (curBucket && curBucket.contains(key)) {
      const nodeHash = curBucket.find(key);
      curBucket.updateValue(nodeHash, value);
    } else if (curBucket && !curBucket.contains(key)) {
      curBucket.append(hash, key, value);
      // increase hashmap capacity during collisions
      this.increaseCapacity();
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

  entries() {
    let filledBuckets = this.table.filter((bucket) => {
      return bucket !== null;
    });
    let keyValuesArr = [];
    filledBuckets.forEach((list) => {
      let totalNodes = list.size();
      let curNodeIndex = 1;
      while (curNodeIndex <= totalNodes) {
        keyValuesArr.push([
          list.at(curNodeIndex).key,
          list.at(curNodeIndex).value,
        ]);
        curNodeIndex++;
      }
    });
    return keyValuesArr;
  }
}

let myHash = new HashMap();
console.log(myHash.table);
