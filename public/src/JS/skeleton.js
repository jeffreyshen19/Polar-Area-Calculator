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
});
