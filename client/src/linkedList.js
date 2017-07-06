export default class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  insert(index, value) {
      //error handling
    if (index < 0 || index > this.length) {
      throw new Error('Index error');
    }
    //creates a new node
    const newNode = {
      value
    };
    // if this is the first node of the linked list, set the next value to this.head and
    //set the head to the newNode
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    }
    else {
            // Find the node which we want to insert after
      const node = this._find(index - 1);
      newNode.next = node.next;
      node.next = newNode;
    }

    this.length++;
  }
  //start at the head
  // loops up to the node before the index
  _find(index) {
    let node = this.head;
    for (let i=0; i<index; i++) {
      node = node.next;
    }
    return node;
  }

  // iterate() {
  //   let result = [];
  //   let node = this.head;
  //   for (let i=0; i<this.length; i++) {
  //     result.push(node.value);
  //     node = node.next;
  //   }
  //   return result;
  // }

  // getValue(index){
  //   let result = this.iterate();
  //   return result[index];
  // }
  
  get(index) {
    //error handling  
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    //gets the value of the node
    return this._find(index).value;
  }

  remove(index) {
    //error handling  
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    //if your're removing the head, set the head the one after the removed head
    if (index === 0) {
      this.head = this.head.next;
    }
    else {
    // Find the node before the one we want to remove
    //then set set the next value of that to the next value of the removed node.
      const node = this._find(index - 1);
      node.next = node.next.next;
    }
    //tmake Linked List smaller by 1.
    this.length--;
  }

}

// let myList = new LinkedList();

// myList.insert(0,1);
// myList.insert(1,2);
// myList.insert(2,3);
// myList.insert(3,4);
// myList.insert(4,5);

// console.log(myList);