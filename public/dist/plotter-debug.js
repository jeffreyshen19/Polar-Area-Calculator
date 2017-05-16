var step;
var scalingFactor;

$(document).ready(function(){
  canvas = document.getElementById("graphCanvas");
  canvas.width = window.innerWidth * 0.7;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
});

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

function submitEquation(){
  var expression = $("#expression").val().replace(/θ/g, "x");
  node = math.parse(expression);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawAxes();

  step = parseFloat($("#step").val());

  var lowerBound = math.eval($("#lowerbound").val().replace(/π/g, "pi"));
  var upperBound = math.eval($("#upperbound").val().replace(/π/g, "pi"));

  scalingFactor = (canvas.height - 40) / (2 * Math.round(getMaxRadius(lowerBound, upperBound)));

  //Create the grid of lines every scalingFactor apart
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

  ctx.fillStyle = "#0092CA";

  for(var theta = lowerBound; theta <= upperBound; theta += step){
    var r = node.eval({x: theta});
    var x = r * math.eval("cos(" + theta + ")") * scalingFactor;
    var y = r * math.eval("sin(" + theta + ")") * scalingFactor;

    ctx.fillRect(canvas.width / 2 + x, canvas.height / 2 - y, 2, 2);
  }
}

function getMaxRadius(a, b){
  var maximumRadius = Number.MIN_VALUE;
  for(var theta = a; theta <= b; theta += step){
    var r = node.eval({x: theta});
    if(r > maximumRadius) maximumRadius = r;
  }
  return maximumRadius;
}
