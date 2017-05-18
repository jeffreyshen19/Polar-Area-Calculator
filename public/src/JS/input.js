function updateInput(val, id){
  $(id).val(val.replace(/theta/gi, "θ").replace(/pi/gi, "π"));
}
