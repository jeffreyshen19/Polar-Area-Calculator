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

function convertToPi(num){ //Converts a number to a form of pi
  var piConstants = [-2, -1, -1/2, -1/3, -1/4, -1/6, 0, 1/6, 1/4, 1/3, 1/2, 1, 2];
  var piConstantsString = ["-2π", "-π", "-\\frac{π}{2}", "-\\frac{π}{3}", "-\\frac{π}{4}",  "-\\frac{π}{6}", "0", "\\frac{π}{6}", "\\frac{π}{4}", "\\frac{π}{3}", "\\frac{π}{2}", "π", "2π"];

  for(var i = 0; i < piConstants.length; i++){
    if(Math.abs(Math.PI * piConstants[i] - num) < 0.01) return piConstantsString[i];
  }

  return truncate(num);
}
