import { LinkedList } from './LinkedList';

export class HashMap {
  // initialize 16-bucket long hash table by default
  table = (function () {
    let table = [];
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

    let entries = this.entries();
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
    let hash = this.hash(key);

    let curBucket = this.table[hash];
    if (curBucket === null) {
      let newList = new LinkedList();
      newList.append(key, value);
      this.table[hash] = newList;
    } else if (curBucket && curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      curBucket.updateValue(nodeIndex, value);
    } else if (curBucket && !curBucket.contains(key)) {
      const totalFilledBuckets = this.table.reduce((total, value) => {
        if (value) {
          return total + 1;
        } else return total;
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
