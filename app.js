class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b); //new set checks for dups, sort sorts arr based on value comparasion
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
      node.data = this.#minValue(node.right);
      node.right = this.delete(node.data, node.right);
    }

    // Return the updated node after deletion
    return node;
  }

  #minValue(node) {
    let minValue = node.data;
    while (node.left != null) {
      minValue = node.left.data;
      node = node.left;
    }
    return minValue;
  }

  find(data, node = this.root) {
    if (node === null) {
      // If the current node is null, the data is not found
      return "not found";
    }

    if (node.data === data) {
      // The data is found at the current node
      return "found";
    }

    // Continue searching in the left or right subtree
    return data < node.data
      ? this.find(data, node.left)
      : this.find(data, node.right);
  }

  levelOrder(cb) {
    if (this.root == null) return;

    // create queue which track child nodes
    const queue = [this.root];
    const levelOrdTraversalArray = [];

    //repeat until queue is empty
    while (queue.length > 0) {
      const current = queue.shift(); //remove and save the current
      cb ? cb(current) : levelOrdTraversalArray.push(current.data); //if callback is present, call it for current else continue making array

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    //
    return levelOrdTraversalArray;
  }

  levelOrderRecursive(cb, queue = [this.root], resultArray = []) {
    if (this.root === null) return;

    // Base case
    if (queue.length === 0) return resultArray;

    // Process the current node
    const current = queue.shift();
    cb ? cb(current) : resultArray.push(current.data);

    // Enqueue the children
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);

    // Recursive call
    return this.levelOrderRecursive(cb, queue, resultArray);
  }

  // left, root, right
  inOrder(cb, node = this.root, list = []) {
    if (node === null) return;

    this.inOrder(cb, node.left, list);
    cb ? cb(node) : list.push(node.data);
    this.inOrder(cb, node.right, list);

    return list;
  }

  // root, left, right
  preOrder(cb, node = this.root, list = []) {
    //base case
    if (node === null) return;
    //process node
    cb ? cb(node) : list.push(node.data);
    //recursive call left and right
    this.preOrder(cb, node.left, list);
    this.preOrder(cb, node.right, list);
    //
    return list;
  }

  //left, right, root
  postOrder(cb, node = this.root, list = []) {
    if (node === null) return;

    this.postOrder(cb, node.left, list);
    this.postOrder(cb, node.right, list);
    cb ? cb(node) : list.push(node.data);

    return list;
  }

  //Height is defined as the number of edges in the longest path from a given node to a leaf node.
  height(node = this.root) {
    if (node === null) return 0;
    //Traverse
    const left = this.height(node.left);
    const right = this.height(node.right);
    // Find the longest path and add 1 for the current node
    return Math.max(left, right) + 1;
  }

  //Depth is defined as the number of edges in the path from a given node to the tree’s root node.
  depth(value, node = this.root, edgeCount = 0) {
    if (node === null) return;
    if (node.data === value) return edgeCount;
    if (node.data < value) {
      return this.depth(value, node.right, edgeCount + 1);
    } else {
      return this.depth(value, node.left, edgeCount + 1);
    }
  }
  // A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
  isBalanced() {
    return this.#testBalance(this.root) !== -1;
  }

  #testBalance(node) {
    if (node === null) return 0;

    const left = this.#testBalance(node.left);
    const right = this.#testBalance(node.right);
    const diff = Math.abs(left - right);

    if (left === -1 || right === -1 || diff > 1) {
      return -1;
    }
    return Math.max(left, right) + 1;
  }

  //use a traversal method to provide a new array to the buildTree function.
  rebalance() {
    const inorderList = this.inOrder();
    this.root = this.buildTree(inorderList);
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

module.exports = {
  Tree,
};
