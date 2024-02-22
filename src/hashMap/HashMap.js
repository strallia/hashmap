import { LinkedList } from './MapLinkedList';

export class HashMap {
  // initialize 16-bucket long hash table by default
  table = (function () {
    const table = [];
    for (let i = 0; i < 16; i++) {
      table.push(null);
    }
    return table;
  })();

  capacity = 16;

  loadFactor = 0.75;

  increaseCapacity() {
    this.table.push(null);
    this.capacity++;

    const entries = this.entries();
    this.clear();
    entries.forEach((entry) => {
      const [key, value] = entry;
      this.set(key, value);
    });
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = Math.floor(
        (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity,
      );
    }

    if (hashCode < 0 || hashCode >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }

    return hashCode;
  }

  set(key, value) {
    const hash = this.hash(key);

    const curBucket = this.table[hash];
    if (curBucket === null) {
      const newList = new LinkedList();
      newList.append(key, value);
      this.table[hash] = newList;
    } else if (curBucket && curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      curBucket.updateValue(nodeIndex, value);
    } else if (curBucket && !curBucket.contains(key)) {
      const totalFilledBuckets = this.table.reduce((total, curValue) => {
        if (curValue) {
          return total + 1;
        }
        return total;
      }, 0);

      // collision so increase hash table capacity if reached load factor
      if (totalFilledBuckets / this.capacity >= this.loadFactor) {
        this.increaseCapacity();
        this.set(key, value);
      } else {
        curBucket.append(key, value);
      }
    }

    return this.table;
  }

  get(key) {
    // returns the value assigned to a given key.
    const index = this.hash(key);
    const curBucket = this.table[index];

    if (curBucket && curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      return curBucket.at(nodeIndex).value;
    }
    return null;
  }

  has(key) {
    // returns boolean based on whether or not given key is in hash map.
    const index = this.hash(key);
    const curBucket = this.table[index];
    return !!(curBucket && curBucket.contains(key));
  }

  remove(key) {
    // removes given key in hash map if present.
    const index = this.hash(key);
    const curBucket = this.table[index];
    if (!curBucket || !curBucket.contains(key)) {
      return false;
    }
    if (curBucket.contains(key) && curBucket.size() === 1) {
      this.table[index] = null;
      return true;
    }
    if (curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      curBucket.removeAt(nodeIndex);
      return true;
    }
  }

  length() {
    // returns the number of stored keys in the hash map.
    let totalNodes = 0;
    this.table.forEach((bucket) => {
      if (bucket) totalNodes += bucket.size();
    });
    return totalNodes;
  }

  clear() {
    // removes all entries in the hash map.
    const clearedTable = this.table.map(() => null);
    return (this.table = clearedTable);
  }

  keys() {
    // returns an array containing all the keys.
    const filledBuckets = this.table.filter((bucket) => bucket !== null);
    const keysArr = [];
    filledBuckets.forEach((list) => {
      const totalNodes = list.size();
      let curNodeIndex = 1;
      while (curNodeIndex <= totalNodes) {
        keysArr.push(list.at(curNodeIndex).key);
        curNodeIndex++;
      }
    });
    return keysArr;
  }

  values() {
    // returns an array containing all the values.
    const filledBuckets = this.table.filter((bucket) => bucket !== null);
    const valuesArr = [];
    filledBuckets.forEach((list) => {
      const totalNodes = list.size();
      let curNodeIndex = 1;
      while (curNodeIndex <= totalNodes) {
        valuesArr.push(list.at(curNodeIndex).value);
        curNodeIndex++;
      }
    });
    return valuesArr;
  }

  entries() {
    // returns an array that contains each key-value pair.
    const filledBuckets = this.table.filter((bucket) => bucket !== null);
    const keyValuesArr = [];
    filledBuckets.forEach((list) => {
      const totalNodes = list.size();
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

const myHash = new HashMap();
myHash.set('0', 'val');
myHash.set('1', 'val');
myHash.set('2', 'val');
myHash.set('test', 'val');
console.log(myHash.table);
