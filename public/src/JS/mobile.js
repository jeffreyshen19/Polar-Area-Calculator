function desktopMode(){
  $("#mobile").hide();
  $("#sidebar").show();
  $("#graph").show();
}

function mobileMode(){
  $("#mobile").show();
  $("#sidebar").hide();
  $("#graph").hide();
}

$(window).resize(function() {
  console.log("hello");
  if(window.innerWidth < 1100 || window.innerHeight < 300){
    mobileMode();
  }
  else{
    desktopMode();
  }
});
