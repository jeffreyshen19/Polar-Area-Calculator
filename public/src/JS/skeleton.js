var canvas, ctx;
var isGraph = false;

$(document).ready(function(){
  canvas = document.getElementById("graphCanvas");
  canvas.width = window.innerWidth * 0.7;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown", handleClick, false);

  $("#expression, .bound, #step").keypress(function (e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
      $('#button').click();
      return false;
    }
    else {
      return true;
    }
  });

  canvas.addEventListener('mousemove', function(e) {
    var mousePos = getMousePos(e);
    var r = Math.sqrt(Math.pow(mousePos.x, 2) + Math.pow(mousePos.y, 2));
    var theta = Math.atan2(mousePos.y, mousePos.x);
    if(theta < 0) theta = Math.PI * 2 + theta;

    $("#polar").html(truncate(r) + ", " + truncate(theta));
    $("#rectangular").html(truncate(mousePos.x) + ", " + truncate(mousePos.y));
  }, false);

  //Make sure the screen is a good size
  if(window.innerWidth < 1100 || window.innerHeight < 450){
    mobileMode();
  }
});
