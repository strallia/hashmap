export class MapNode {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.next = nextNode;
  }
}
