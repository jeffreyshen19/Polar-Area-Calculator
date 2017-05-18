var canvas, ctx;

$(document).ready(function(){
  canvas = document.getElementById("graphCanvas");
  canvas.width = window.innerWidth * 0.7;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown", handleClick, false);
});
