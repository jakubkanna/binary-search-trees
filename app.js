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
    //base case
    if (arr.length === 0) return null;
    //init
    const mid = Math.floor(arr.length / 2); //arr must be sorted
    const node = new Node(arr[mid]);

    //make left and right
    node.left = this.buildTree(arr.slice(0, mid));
    node.right = this.buildTree(arr.slice(mid + 1));

    // Set root to the level-0 root node
    return node;
  }

  insert(value, node = this.root) {
    //base case (node.left or node.right changes from null to a new node)
    if (node === null) return new Node(value);

    //traverse
    node.data < value
      ? (node.right = this.insert(value, node.right))
      : (node.left = this.insert(value, node.left));

    return node;
  }

  delete(value, node = this.root) {
    //base case: nothing to delete
    if (node === null) return node;
    //traverse
    if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
    }
    //if the current node is the one to be deleted
    else {
      // node with only one child or no child
      if (node.right == null) return node.left;
      if (node.left == null) return node.right;

      // node with two children
      node.data = this.minValue(node.right);
      node.right = this.delete(node.data, node.right);
    }

    // Return the updated node after deletion
    return node;
  }

  minValue(node) {
    let minValue = node.data;
    while (node.left != null) {
      minValue = node.left.data;
      node = node.left;
    }
    return minValue;
  }

  find(data, node = this.root) {
    if (node.data === data) return node;

    if (data < node.data) return this.find(data, node.left);
    if (data > node.data) return this.find(data, node.right);
  }
  /**
   * 
   levelOrder should traverse the tree in breadth-first level order and provide each node as an argument to the callback.
    As a result, the callback will perform an operation on each node following the order in which they are traversed. 
   */

  levelOrder(cb) {
    if (this.root == null) return;

    // create queue which track child nodes

    const queue = [this.root];
    const levelOrdTraversalArray = [];

    //repeat until queue is empty
    while (queue.length > 0) {
      const current = queue.shift(); //remove and save the current
      cb ? cb(current) : levelOrdTraversalArray.push(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    //
    return levelOrdTraversalArray;
  }
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

const tree = new Tree([50, 30, 70, 20, 40, 60, 80]);

// tree.insert(29);
// tree.delete(20);
// tree.delete(50);

console.log(tree.levelOrder());

prettyPrint(tree.root);
