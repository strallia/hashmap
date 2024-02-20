export class Node {
  constructor(hash, key = null, value = null, nextNode = null) {
    this.hash = hash.toString();
    this.key = key;
    this.value = value;
    this.next = nextNode;
  }
}
