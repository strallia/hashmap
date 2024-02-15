export class HashMap {
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = Math.floor((primeNumber * hashCode + key.charCodeAt(i)) % 16);
    }

    return hashCode;
  }
}

let myHash = new HashMap();
console.log(myHash.hash('test'));
