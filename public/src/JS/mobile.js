/*
  Mobile.js
  Jeffrey Shen

  This file takes care of automatically resizing and making sure the app looks good on many screen sizes.
*/

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
  if(window.innerWidth < 1100 || window.innerHeight < 450){
    mobileMode();
  }
  else{
    desktopMode();
  }

  canvas.width = window.innerWidth * 0.7;
  canvas.height = window.innerHeight;

  if(isGraph){
    submitEquation();
  }
});
