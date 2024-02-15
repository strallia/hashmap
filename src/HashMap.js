export class HashMap {
  buckets = [];
  bucketsLength = 16;

  constructor() {
    for (let i = 0; i < this.bucketsLength; i++) {
      this.buckets.push(null);
    }
  }

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
    // find hashCode for given key.
    // if bucket === null (ie contains no nodes), generate head node for starting new linked list
    // with key and value properties passed and next set to null.
    // else traverse list while checking if the curNode's key === key. If so,
    // stop traversing and update the node's value with passed value.
    // else if no key match was found, traverse to end of list to append
    // new node
  }
}

let myHash = new HashMap();
console.log(myHash.buckets);
