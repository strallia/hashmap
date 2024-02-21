import { MapLinkedList } from './MapLinkedList';

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
      const newList = new MapLinkedList();
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
    const index = this.hash(key);
    const curBucket = this.table[index];

    if (curBucket && curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      return curBucket.at(nodeIndex).value;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const curBucket = this.table[index];
    return !!(curBucket && curBucket.contains(key));
  }

  remove(key) {
    const index = this.hash(key);
    const curBucket = this.table[index];
    if (!curBucket || !curBucket.contains(key)) {
      return false;
    }
    if (curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      curBucket.removeAt(nodeIndex);
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
    const clearedTable = this.table.map(() => null);
    return (this.table = clearedTable);
  }

  keys() {
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
myHash.set('3', 'val');
myHash.set('4', 'val');
myHash.set('5', 'val');
myHash.set('6', 'val');
myHash.set('7', 'val');
myHash.set('8', 'val');
myHash.set('9', 'val');
myHash.set('10', 'val');
myHash.set('20', 'val');
myHash.set('test', 'val');
console.log(myHash.table);
