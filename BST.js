const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.#buildTree(this.#sortAndRemoveDuplicates(arr));
  }

  #buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor((array.length - 1) / 2);

    const root = new Node(array[mid]);

    root.left = this.#buildTree(array.slice(0, mid));
    root.right = this.#buildTree(array.slice(mid + 1));

    return root;
  }

  #sortAndRemoveDuplicates(array) {
    return [...new Set(array.slice().sort((a, b) => a - b))];
  }

  includes(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) return true;

      if (value > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }

    return false;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let current = this.root;

    while (current !== null) {
      if (value === current.data) return;

      if (value > current.data) {
        if (current.right === null) {
          current.right = new Node(value);
          return;
        }

        current = current.right;
      } else {
        if (current.left === null) {
          current.left = new Node(value);
          return;
        }

        current = current.left;
      }
    }
  }

  deleteItem(value) {
    if (this.root === null) return;

    if (
      value === this.root.data &&
      this.root.right === null &&
      this.root.left === null
    ) {
      this.root = null;
      return;
    }

    if (
      value === this.root.data &&
      this.root.right !== null &&
      this.root.left === null
    ) {
      this.root = this.root.right;
      return;
    }

    if (
      value === this.root.data &&
      this.root.right === null &&
      this.root.left !== null
    ) {
      this.root = this.root.left;
      return;
    }

    let current = this.root;
    let prev;
    let isRight = false;

    while (current !== null) {
      if (
        value === current.data &&
        current.right !== null &&
        current.left !== null
      ) {
        let successor = current.right;

        while (successor !== null) {
          if (successor.left === null) {
            break;
          }
          successor = successor.left;
        }

        const temp = current.data;
        current.data = successor.data;
        successor.data = temp;
        prev = current;
        current = current.right;
        isRight = true;
      }

      if (
        value === current.data &&
        current.right === null &&
        current.left === null
      ) {
        if (isRight) {
          prev.right = null;
          return;
        } else {
          prev.left = null;
          return;
        }
      }

      if (
        value === current.data &&
        current.right !== null &&
        current.left === null
      ) {
        const temp = current.right;
        if (isRight) {
          prev.right = temp;
          return;
        } else {
          prev.left = temp;
          return;
        }
      }

      if (
        value === current.data &&
        current.right === null &&
        current.left !== null
      ) {
        const temp = current.left;
        if (isRight) {
          prev.right = temp;
          return;
        } else {
          prev.left = temp;
          return;
        }
      }

      if (value > current.data) {
        prev = current;
        current = current.right;
        isRight = true;
      } else {
        prev = current;
        current = current.left;
        isRight = false;
      }
    }

    return;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback is required as a parameter');
    }

    if (this.root === null) return;

    let index = 0;

    const queue = [];

    queue.push(this.root);

    while (index < queue.length) {
      const current = queue[index];
      callback(current.data);
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
      index++;
    }
  }
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(test.root);

test.levelOrderForEach((value) => {
  console.log(value);
});
