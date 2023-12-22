const { Tree } = require("./app");

const randomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const tree = new Tree(randomArray(20));

tree.prettyPrint(tree.root);

// Uncomment the logs
console.table({
  isBalanced: tree.isBalanced(),
  levelOrder: tree.levelOrder(),
  inOrder: tree.inOrder(),
  preOrder: tree.preOrder(),
  postOrder: tree.postOrder(),
  ["find 13"]: tree.find(13),
});

// Uncomment the tree modification and rebalance logs
// tree.insert(300);
// tree.insert(400);
// tree.insert(500);

// console.log(tree.isBalanced());
// tree.rebalance();
// console.log(tree.isBalanced());

// Uncomment the logs after rebalancing
// console.table({
//   isBalancedAfterRebalance: tree.isBalanced(),
//   levelOrderAfterRebalance: tree.levelOrder(),
//   inOrderAfterRebalance: tree.inOrder(),
//   preOrderAfterRebalance: tree.preOrder(),
//   postOrderAfterRebalance: tree.postOrder(),
// });
