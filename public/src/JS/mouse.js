/*
  Mouse.js
  Jeffrey Shen

  This file takes care of processing mouse clicks and hovers.
*/

var imageData;
var thetaWhenFillingArea, lowerBoundWhenFillingArea, upperBoundWhenFillingArea;

function handleClick(e){
  $("#error").hide();
  if(isGraph){
    var x = e.x;
    var y = e.y;

    x -= window.innerWidth * 0.3 + canvas.width / 2 + canvas.offsetLeft;
    y -= canvas.offsetTop;

    y = canvas.height / 2 - y;

    x /= scalingFactor;
    y /= scalingFactor;

    var theta = Math.atan2(y, x);
    if(theta < 0) theta = Math.PI * 2 + theta;

    var r = node.eval({x: theta});
    if(r < 0 && node.eval({x : theta + Math.PI}) < 0) r = Math.abs(node.eval({x: theta + Math.PI}));
    var rClicked = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    if(r >= 0 && rClicked <= Math.abs(r)){
      var zones = calculateTheta();

      var a, b;
      for(var i = 0; i < zones.length; i++){
        if(theta <= zones[i]){
          if(i == 0) a = zones[zones.length - 1];
          else a = zones[i - 1];
          b = zones[i];
          break;
        }
      }

      console.log(zones);

      if(a == null && b == null){
        a = zones[zones.length - 1];
        b = zones[0];
        if(Math.abs(b - a) <= 0.07) {
          displayError("You need to click on an actual zone!");
          return;
        }
      }

      if(a > b) a -= 2 * Math.PI;

      ctx.putImageData(imageData, 0, 0);

      ctx.strokeStyle = "#dcdcdc";
      ctx.lineWidth = 2;
      thetaWhenFillingArea = a;
      lowerBoundWhenFillingArea = a;
      upperBoundWhenFillingArea = b;
      window.requestAnimationFrame(fillInArea);

      updateIntegral(convertToPi(a), convertToPi(b), truncate(0.5 * integrate(expression + "^2", a, b)));
    }
    else{
      displayError("You need to click on an actual zone!");
    }
  }
}

function updateIntegral(a, b, val){
  $("#integralrepresentation p").html("$$\\frac{1}{2}\\int_{" + a + "}^{" + b + "} r^2 dθ = " + val + "$$");
  var math = document.getElementById("integralrepresentation");
  MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
}

function calculateTheta(){
  var candidates = [];
  for(var theta = lowerBound; theta <= upperBound; theta += 0.0005){
    var r = node.eval({x: theta});
    if(r <= 0.002 && r >= 0) {
      candidates.push(theta);
    }
  }
  return candidates;
}

function fillInArea(){
  if(thetaWhenFillingArea <= upperBoundWhenFillingArea){
    var r = Math.abs(node.eval({x: thetaWhenFillingArea}));
    var x = r * math.eval("cos(" + thetaWhenFillingArea + ")") * scalingFactor;
    var y = r * math.eval("sin(" + thetaWhenFillingArea + ")") * scalingFactor;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 - y);
    ctx.stroke();
    thetaWhenFillingArea += step;

    window.requestAnimationFrame(fillInArea);
  }
}

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left - canvas.width / 2) / scalingFactor,
    y: (canvas.height / 2 - evt.clientY - rect.top) / scalingFactor
  };
}
