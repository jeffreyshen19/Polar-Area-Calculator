$(document).ready(function(){
  canvas.addEventListener("mousedown", handleClick, false);
});

function handleClick(e){
  var x = e.x;
  var y = e.y;

  x -= window.innerWidth * 0.3 + canvas.width / 2 + canvas.offsetLeft;
  y -= canvas.offsetTop;

  y = canvas.height / 2 - y;

  x /= scalingFactor;
  y /= scalingFactor;

  alert(x + ", " + y);
}

function calculateTheta(x, y){
  //Interesection points at theta = 0, pi/2, pi, pi/4...
}
