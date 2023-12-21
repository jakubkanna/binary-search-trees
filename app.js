class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(arr) {
    // Implementation of building a balanced binary tree
    //base case
    if (arr.length === 0) return null;
    //init
    const mid = Math.floor(arr.length / 2); //arr must be sorted
    const node = new Node(arr[mid]);

    //recursively:
    //1. calc left subarr mid and make it root of left subtree
    node.left = this.buildTree(arr.slice(0, mid));
    //2. calc right subarr mid and make it root of right subtree
    node.right = this.buildTree(arr.slice(mid + 1));

    // Set root to the level-0 root node
    return node;
  }

  insert(value, node = this.root) {
    //base case (leaf)
    if (node === null) return new Node(value);

    //go left if true else go right
    node.data < value
      ? (node.right = this.insert(value, node.right))
      : (node.left = this.insert(value, node.left));

    return node;
  }

  // Check the value to be inserted (say X) with the value of the current node (say val) we are in
  //Once the leaf node is reached, insert X to its right or left based on the relation between X and the leaf node’s value.

  delete(value) {}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([100, 20, 500, 10, 30]);

tree.insert(29);

prettyPrint(tree.root);
