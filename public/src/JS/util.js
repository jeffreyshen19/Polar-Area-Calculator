/*
  Util.js
  Jeffrey Shen

  This file provides various utility functions like integration and truncating
*/

function integrate(expression, a, b){
  var stepSize = 0.0005, node = math.parse(expression);

  var leftEdgeSum = 0, rightEdgeSum = 0, midpointSum = 0;
  for(var i = a; i <= b - stepSize; i += stepSize){
    leftEdgeSum += node.eval({x: i}) * stepSize;
    rightEdgeSum += node.eval({x: i + stepSize}) * stepSize;
    midpointSum += node.eval({x: i + stepSize / 2}) * stepSize;
  }

  var trapezoidSum = (leftEdgeSum + rightEdgeSum) / 2;

  return (2 * midpointSum + trapezoidSum) / 3;
}

function truncate(num){
  num = "" + num;
  return num.substring(0, Math.min(num.length, 7));
}
