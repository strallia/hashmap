import { Node } from './MapNode';

export class LinkedList {
  list = null;

  append(key, value) {
    if (!this.list) {
      this.list = { head: new Node(key, value) };
    } else {
      let tmp = this.list.head;
      while (tmp.next) {
        tmp = tmp.next;
      }
      tmp.next = new Node(key, value);
    }
    return this.list;
  }

  contains(key) {
    if (!this.list) return 'ERROR: No nodes.';
    let pointer = this.list.head;
    while (pointer) {
      if (pointer.key === key) return true;
      pointer = pointer.next;
    }
    return false;
  }

  find(key) {
    if (!this.list) return null;
    let pointer = this.list.head;
    let counter = 1;
    while (pointer) {
      if (pointer.key === key) return counter;
      pointer = pointer.next;
      counter += 1;
    }
    return null;
  }

  updateValue(nodeIndex, value) {
    let pointer = this.list.head;
    let curNodeIndex = 1;
    while (curNodeIndex < nodeIndex) {
      pointer = pointer.next;
      curNodeIndex += 1;
    }
    pointer.value = value;
    return pointer;
  }

  at(index) {
    if (!this.list) return null;
    let pointer = this.list.head;
    let curIndex = 1;
    while (curIndex < index) {
      pointer = pointer.next;
      curIndex += 1;
    }
    return pointer;
  }

  removeAt(index) {
    if (!this.list) return 'ERROR: Empty list.';
    if (index === 1) {
      this.list.head = this.list.head.next;
      return this.list;
    }
    let prevPointer = null;
    let curPointer = this.list.head;
    let counter = 1;
    while (curPointer) {
      if (counter === index) {
        prevPointer.next = curPointer.next;
        return this.list;
      }
      prevPointer = curPointer;
      curPointer = curPointer.next;
      counter += 1;
    }
    return 'ERROR: Index outside of list range.';
  }

  size() {
    if (!this.list) return 0;

    let pointer = this.list.head;
    let counter = 1;
    while (pointer.next) {
      counter += 1;
      pointer = pointer.next;
    }
    return counter;
  }
}
