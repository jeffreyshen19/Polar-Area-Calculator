function handleClick(e){
  var x = e.x;
  var y = e.y;

  x -= window.innerWidth * 0.3 + canvas.width / 2 + canvas.offsetLeft;
  y -= canvas.offsetTop;

  y = canvas.height / 2 - y;

  x /= scalingFactor;
  y /= scalingFactor;

  console.log(x + ", " + y);

  //alert(x + ", " + y);

  updateIntegral(0, 1, 5);
}

function updateIntegral(a, b, val){
  $("#integralrepresentation p").html("$$\\frac{1}{2}\\int_{" + a + "}^{" + b + "} r^2 dθ = " + val + "$$");
  var math = document.getElementById("integralrepresentation");
  MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
}

function calculateTheta(x, y){
  //Interesection points at theta = 0, pi/2, pi, pi/4...
}
