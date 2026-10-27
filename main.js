import { Tree } from './bst.js';

function getRandomInt() {
  return Math.floor(Math.random() * 100);
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

function printTraversal(name, traversal) {
  const values = [];

  traversal((value) => {
    values.push(value);
  });

  console.log(`${name}:`, values);
}

const myTree = new Tree([
  getRandomInt(),
  getRandomInt(),
  getRandomInt(),
  getRandomInt(),
  getRandomInt(),
  getRandomInt(),
  getRandomInt(),
  getRandomInt(),
  getRandomInt(),
  getRandomInt(),
]);

prettyPrint(myTree.root);

printTraversal('Level order', (callback) => myTree.levelOrderForEach(callback));

printTraversal('Preorder', (callback) => myTree.preOrderForEach(callback));

printTraversal('Postorder', (callback) => myTree.postOrderForEach(callback));

printTraversal('Inorder', (callback) => myTree.inOrderForEach(callback));

console.log('Initially balanced:', myTree.isBalanced());

myTree.insert(101);

myTree.insert(102);

myTree.insert(103);

// After inserting 101, 102, and 103:
console.log('Balanced after insertions:', myTree.isBalanced());

myTree.rebalance();

// After calling rebalance():
console.log('Balanced after rebalancing:', myTree.isBalanced());

printTraversal('Level order', (callback) => myTree.levelOrderForEach(callback));

printTraversal('Preorder', (callback) => myTree.preOrderForEach(callback));

printTraversal('Postorder', (callback) => myTree.postOrderForEach(callback));

printTraversal('Inorder', (callback) => myTree.inOrderForEach(callback));
