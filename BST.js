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
}

const test = new Tree([1, 2, 4]);

test.insert(3);

test.insert(5);

test.insert(7);

prettyPrint(test.root);
