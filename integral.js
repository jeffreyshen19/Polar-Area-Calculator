var math = require('mathjs');

var expression = "sin(x)^2";
var a = 0;
var b = 1;
var step = 0.0001;

module.exports = {
  eval: function(){
    var result = 0;
    for(var i = a; i <= b; i += step){
      result += step * (math.eval(expression.replace(/x/gi, "" + i)))
    }
    return result;
  }
};
