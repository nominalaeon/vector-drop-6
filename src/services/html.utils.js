
var HtmlUtils = {
  nodelistToArray: nodelistToArray
};

export default HtmlUtils;

/**
 * General methods
 */

function nodelistToArray(arr, nodes, index) {
  arr.push(nodes[index]);

  index = index + 1;

  return nodes[index]
    ? nodelistToArray(arr, nodes, index)
    : arr;
}
