# Your Project Name

## Tree Class Functions

### Constructor

- **`constructor(array)`**
  - Initializes a new binary search tree using a sorted and unique array.

### Tree Building and Modification

- **`buildTree(arr)`**

  - Builds a balanced binary search tree from a sorted array.

- **`insert(value, node = this.root)`**

  - Inserts a new node with the given value into the tree.

- **`delete(value, node = this.root)`**
  - Deletes a node with the given value from the tree.

### Tree Traversal

- **`find(data, node = this.root)`**

  - Searches for a node with the given data in the tree.

- **`levelOrder(cb)`**

  - Performs a level-order traversal of the tree, executing a callback function for each node.

- **`levelOrderRecursive(cb, queue = [this.root], resultArray = [])`**

  - Performs a level-order traversal of the tree using recursion.

- **`inOrder(cb, node = this.root, list = [])`**

  - Performs an in-order traversal of the tree, executing a callback function for each node.

- **`preOrder(cb, node = this.root, list = [])`**

  - Performs a pre-order traversal of the tree, executing a callback function for each node.

- **`postOrder(cb, node = this.root, list = [])`**
  - Performs a post-order traversal of the tree, executing a callback function for each node.

### Tree Properties

- **`height(node = this.root)`**

  - Calculates the height of the tree.

- **`depth(value, node = this.root, edgeCount = 0)`**

  - Calculates the depth of a node with the given value.

- **`isBalanced()`**
  - Checks if the tree is balanced.

### Tree Rebalancing

- **`rebalance()`**
  - Rebalances the tree using an in-order traversal.

### Tree Visualization

- **`prettyPrint(node, prefix = "", isLeft = true)`**
  - Visualizes the tree in the console in a structured and readable format.

## Installation

To install the necessary dependencies, use the following command:

```bash
npm i
```

## Usage

After installing the dependencies, you can run the app using the following command:

```
nodemon driver.js
```

This command will start the application using nodemon, which helps in automatically restarting the application when changes are detected.
