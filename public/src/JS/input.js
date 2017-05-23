/*
  Input.js
  Jeffrey Shen

  This file takes care of formatting the math inside the inputs.
*/

function updateInput(val, id){
  if(val.toLowerCase().indexOf("pi") != -1 || val.toLowerCase().indexOf("theta") != -1) $(id).val(val.replace(/theta/gi, "θ").replace(/pi/gi, "π"));

  if(id === "#expression"){
    if(val.indexOf("*") != -1) $(id).val(val.replace(/\*/gi, "•"));
  }
}

$(document).keyup(function(e){
  var val = $("#expression").val();
  if(e.which == 83 && val.search(/cos$/gi) != -1){
    $("#expression").val(val.replace(/cos/gi, "cos("));
  }
  if(e.which == 78 && val.search(/sin$/gi) != -1){
    $("#expression").val(val.replace(/sin/gi, "sin("));
  }
  if(e.which == 78 && val.search(/tan$/gi) != -1){
    $("#expression").val(val.replace(/sin/gi, "tan("));
  }
});
