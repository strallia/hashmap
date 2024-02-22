import { LinkedList } from './SetLinkedList';

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

    const keys = this.keys();
    this.clear();
    keys.forEach((key) => this.set(key));
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

  set(key) {
    const hash = this.hash(key);

    const curBucket = this.table[hash];
    if (curBucket === null) {
      const newList = new LinkedList();
      newList.append(key);
      this.table[hash] = newList;
    } else if (curBucket && !curBucket.contains(key)) {
      const totalFilledBuckets = this.table.reduce((total, filledBucket) => {
        if (filledBucket) {
          return total + 1;
        }
        return total;
      }, 0);

      // collision so increase hash table capacity if reached load factor
      if (totalFilledBuckets / this.capacity >= this.loadFactor) {
        this.increaseCapacity();
        this.set(key);
      } else {
        curBucket.append(key);
      }
    }

    return this.table;
  }

  has(key) {
    // returns boolean based on whether or not given key is in hash set.
    const index = this.hash(key);
    const curBucket = this.table[index];
    return !!(curBucket && curBucket.contains(key));
  }

  remove(key) {
    // removes given key in hash set if present.
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
    // returns the number of stored keys in the hash set.
    let totalNodes = 0;
    this.table.forEach((bucket) => {
      if (bucket) totalNodes += bucket.size();
    });
    return totalNodes;
  }

  clear() {
    // removes all entries in the hash set.
    const clearedTable = this.table.map(() => null);
    return (this.table = clearedTable);
  }

  keys() {
    // returns an array containing all the keys inside the hash set.
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
}

const myHash = new HashMap();
myHash.set('0');
myHash.set('1');
myHash.set('2');
myHash.set('3');
myHash.set('4');
myHash.set('5');
myHash.set('6');
myHash.set('7');
myHash.set('8');
myHash.set('9');
myHash.set('10');
myHash.set('20');
myHash.set('test');
console.log(myHash.table);
