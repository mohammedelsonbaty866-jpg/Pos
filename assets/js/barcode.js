const beep = new Audio("assets/sounds/beep.mp3");

function playBeep(){
  beep.currentTime=0;
  beep.play();
}
