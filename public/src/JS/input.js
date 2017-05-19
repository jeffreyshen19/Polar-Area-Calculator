function updateInput(val, id){
  if(val.toLowerCase().indexOf("pi") != -1 || val.toLowerCase().indexOf("theta") != -1) $(id).val(val.replace(/theta/gi, "θ").replace(/pi/gi, "π"));
}
