function updateInput(val, id){
  $(id).val(val.replace(/theta/gi, "θ").replace(/pi/gi, "π"));
}

$(function() {
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
