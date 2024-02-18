import { Node } from './Node';

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

  // prepend(value) {
  //   if (!this.list) {
  //     this.append(value);
  //   } else {
  //     const curHead = this.list.head;
  //     this.list.head = new Node(value, curHead);
  //   }
  //   return this.list;
  // }

  // size() {
  //   if (!this.list) return 0;

  //   let pointer = this.list.head;
  //   let counter = 1;
  //   while (pointer.next) {
  //     counter += 1;
  //     pointer = pointer.next;
  //   }
  //   return counter;
  // }

  // head() {
  //   if (!this.list) return null;
  //   return this.list.head;
  // }

  // tail() {
  //   if (!this.list) return 'ERROR: No nodes in list.';
  //   let pointer = this.list.head;
  //   while (pointer.next) {
  //     pointer = pointer.next;
  //   }
  //   return pointer;
  // }

  // pop() {
  //   if (!this.list) return 'ERROR: No nodes to remove.';
  //   let prevPointer = null;
  //   let curPointer = this.list.head;
  //   while (curPointer.next) {
  //     prevPointer = curPointer;
  //     curPointer = curPointer.next;
  //   }
  //   prevPointer.next = null;
  //   return this.list;
  // }

  // toString() {
  //   if (!this.list) return null;
  //   const arr = [];
  //   let pointer = this.list.head;
  //   while (pointer) {
  //     arr.push(pointer.value);
  //     pointer = pointer.next;
  //   }
  //   return arr
  //     .map((value) => `( ${value} )`)
  //     .join(' -> ')
  //     .concat(' -> null');
  // }

  // insertAt(value, index) {
  //   if (!this.list) return 'ERROR: Empty list.';
  //   if (index === 1) return this.prepend(value);
  //   let prevPointer = null;
  //   let curPointer = this.list.head;
  //   let counter = 1;
  //   while (curPointer) {
  //     if (counter === index) {
  //       prevPointer.next = new Node(value, curPointer);
  //       return this.list;
  //     }
  //     prevPointer = curPointer;
  //     curPointer = curPointer.next;
  //     counter += 1;
  //   }
  //   return 'ERROR: Index outside of list range.';
  // }
}
