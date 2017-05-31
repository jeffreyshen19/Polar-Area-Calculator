/*
  Plotter.js
  Jeffrey Shen

  This file takes care of graphing the equations
*/

var step, scalingFactor, expression, node, lowerBound, upperBound;

function submitEquation(){
  //This method takes care of plotting the graphs
  ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear canvas
  $("#loading").show();

  setTimeout(function(){
    expression = $("#expression").val().replace(/θ/g, "x").replace(/π/g, "pi").replace(/•/g, "*");

    node = math.parse(expression);

    step = parseFloat($("#step").val());
    lowerBound = math.eval($("#lowerbound").val().replace(/π/g, "pi"));
    upperBound = math.eval($("#upperbound").val().replace(/π/g, "pi"));

    try{
      node.eval({x: lowerBound});
    }
    catch(e){
      displayError("Oops! We couldn't parse that equation");
      return;
    }

    isGraph = true;

    $("#error").hide();

    $("#coordinates").show();
    $("#polar").html("");
    $("#rectangular").html("");
    $("#integralrepresentation p").html("");

    //Initialize values
    scalingFactor = (canvas.height - 40) / (2 * Math.round(getMaxRadius()));

    drawAxes();
    drawGrid();
    drawGraph();

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    $("#loading").hide();
  }, 0);
}

function drawAxes(){
  //Create axises
  ctx.strokeStyle = "#222831";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
}

function drawGrid(){
  //Create the polar grid
  ctx.beginPath();
  ctx.strokeStyle = "#9a9a9a";
  ctx.lineWidth = 2;
  for(var i = 1; true; i++){
    if(scalingFactor * i > canvas.width / 2) break;
    ctx.arc(canvas.width / 2, canvas.height / 2, scalingFactor * i, 0, 2 * Math.PI);
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "#dcdcdc";
  ctx.lineWidth = 1;
  for(var i = 0.5; true; i++){
    if(scalingFactor * i > canvas.width / 2) break;
    ctx.arc(canvas.width / 2, canvas.height / 2, scalingFactor * i, 0, 2 * Math.PI);
  }
  ctx.stroke();
}

function drawGraph(){
  //Plots the graph
  ctx.strokeStyle = "#0092CA";
  ctx.lineWidth = 2;

  var lastX, lastY;
  for(var theta = lowerBound; theta <= upperBound; theta += step){
    var r = node.eval({x: theta});
    var x = Math.round(r * math.eval("cos(" + theta + ")") * scalingFactor);
    var y = Math.round(r * math.eval("sin(" + theta + ")") * scalingFactor);

    if(theta == lowerBound){
      ctx.fillRect(canvas.width / 2 + x, canvas.height / 2 - y, 2, 2);
      ctx.beginPath();
    }
    else{
      ctx.moveTo(canvas.width / 2 + lastX, canvas.height / 2 - lastY);
      ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 - y);
    }

    lastX = x;
    lastY = y;
  }

  ctx.stroke();
}

function getMaxRadius(){
  var derivativeExpression = math.derivative(expression, "x");
  var criticalNumbers = [lowerBound, upperBound];
  for(var theta = lowerBound; theta <= upperBound; theta += 0.001){
    var derivative = derivativeExpression.eval({x: theta});
    if(Math.abs(derivative) <= 0.001) criticalNumbers.push(theta);
  }
  var maximumRadius = node.eval({x: lowerBound});
  for(var i = 1; i < criticalNumbers.length; i++){
    var r = Math.abs(node.eval({x: criticalNumbers[i]}));
    if(r > maximumRadius) maximumRadius = r;
  }
  return maximumRadius;
}

function displayError(error){
  $("#error").html(error);
  $("#error").show();
}
