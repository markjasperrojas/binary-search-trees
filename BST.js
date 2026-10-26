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

  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback is required as a parameter');
    }

    let current = this.root;

    this.#preOrder(current, callback);
  }

  #preOrder(node, callback) {
    if (node === null) return;

    callback(node.data);

    this.#preOrder(node.left, callback);
    this.#preOrder(node.right, callback);
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback is required as a parameter');
    }

    this.#inOrder(this.root, callback);
  }

  #inOrder(node, callback) {
    if (node === null) return;

    this.#inOrder(node.left, callback);
    callback(node.data);
    this.#inOrder(node.right, callback);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback is required as a parameter');
    }

    this.#postOrder(this.root, callback);
  }

  #postOrder(node, callback) {
    if (node === null) return;

    this.#postOrder(node.left, callback);
    this.#postOrder(node.right, callback);
    callback(node.data);
  }

  height(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) {
        return this.#heightRecur(current) - 1;
      }

      if (value > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
  }

  #heightRecur(node) {
    if (node === null) return 0;

    const left = this.#heightRecur(node.left);
    const right = this.#heightRecur(node.right);

    return Math.max(left, right) + 1;
  }

  depth(value) {
    if (this.root === null) return undefined;

    let depth = 0;
    let current = this.root;

    while (current !== null) {
      if (value === current.data) {
        return depth;
      }

      if (value > current.data) {
        depth++;
        current = current.right;
      } else {
        depth++;
        current = current.left;
      }
    }

    return undefined;
  }
}

const test = new Tree([1, 2, 3, 4, 5]);

prettyPrint(test.root);

console.log(test.depth(3));
