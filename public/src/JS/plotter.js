var step, scalingFactor, expression, node, lowerBound, upperBound;

function submitEquation(){
  expression = $("#expression").val().replace(/θ/g, "x");
  node = math.parse(expression);
  isGraph = true;

  //Initialize values
  step = parseFloat($("#step").val());
  lowerBound = math.eval($("#lowerbound").val().replace(/π/g, "pi"));
  upperBound = math.eval($("#upperbound").val().replace(/π/g, "pi"));
  scalingFactor = (canvas.height - 40) / (2 * Math.round(getMaxRadius()));

  ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear canvas

  drawAxes();
  drawGrid();
  drawGraph();
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
  //Create the grid of lines spaced accordingly
  for(var i = 0.5; true; i += 0.5){
    if(scalingFactor * i > canvas.height / 2) break;
    if(i % 1 == 0){
      ctx.strokeStyle = "#9a9a9a";
      ctx.lineWidth = 2;
    }
    else{
      ctx.strokeStyle = "#dcdcdc";
      ctx.lineWidth = 1;
    }
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2 + scalingFactor * i);
    ctx.lineTo(canvas.width, canvas.height / 2 + scalingFactor * i);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2 - scalingFactor * i);
    ctx.lineTo(canvas.width, canvas.height / 2 - scalingFactor * i);
    ctx.stroke();
  }
  for(var i = 0.5; true; i += 0.5){
    if(scalingFactor * i > canvas.width / 2) break;
    if(i % 1 == 0){
      ctx.strokeStyle = "#9a9a9a";
      ctx.lineWidth = 2;
    }
    else{
      ctx.strokeStyle = "#dcdcdc";
      ctx.lineWidth = 1;
    }
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + scalingFactor * i, 0);
    ctx.lineTo(canvas.width / 2 + scalingFactor * i, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - scalingFactor * i, 0);
    ctx.lineTo(canvas.width / 2 - scalingFactor * i, canvas.height);
    ctx.stroke();
  }
}

function drawGraph(){
  //Plots the graph
  ctx.fillStyle = "#0092CA";
  for(var theta = lowerBound; theta <= upperBound; theta += step){
    var r = node.eval({x: theta});
    var x = r * math.eval("cos(" + theta + ")") * scalingFactor;
    var y = r * math.eval("sin(" + theta + ")") * scalingFactor;

    ctx.fillRect(canvas.width / 2 + x, canvas.height / 2 - y, 2, 2);
  }
}

function getMaxRadius(){
  var derivativeExpression = math.derivative(expression, "x");
  var criticalNumbers = [lowerBound, upperBound];
  for(var theta = lowerBound; theta <= upperBound; theta += step){
    var derivative = derivativeExpression.eval({x: theta});
    if(Math.abs(derivative) <= 0.001) criticalNumbers.push(theta);
  }
  var maximumRadius = node.eval({x: lowerBound});
  for(var i = 1; i < criticalNumbers.length; i++){
    if(node.eval({x: criticalNumbers[i]}) > maximumRadius) maximumRadius = node.eval({x: criticalNumbers[i]});
  }
  return maximumRadius;
}
