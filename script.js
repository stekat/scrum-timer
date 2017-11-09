var timer;
var modal;
var rangeMinutes;
var sliderMinutes;
var checkboxSound;
var isRunning = false;
var currentMinute;
var currentSecond;
var sound = new Audio('audio/xylophone.ogg');

window.onload = function() {
  timer = document.getElementById('timer');
  modal = document.getElementById('myModal');
  rangeMinutes = document.getElementById('rangeMinutes');
  sliderMinutes = document.getElementById('slider-minutes');
  checkboxSound = document.getElementById('checkbox-sound');
  initTimer();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

function StartTimer(){
  if(!isRunning) {
    isRunning = true;
    timerID = setInterval(tick, 1000);
  }
}

function ResetTimer() {
  if (typeof timerID !== 'undefined') {
    clearInterval(timerID);
  }
  
  setCurrentsFromSelectedRange();
  showCurrentTime(currentMinute, currentSecond);
}

function StopTimer(){
  isRunning = false;
  clearInterval(timerID);
}
  
function tick(){ 
  if(currentMinute === 0 && currentSecond === 0) {
    StopTimer();
    if (checkboxSound.checked === true) {
      sound.play(); 
    }
    return;
  }

  if(currentSecond === 0 ){
    currentMinute--;
    currentSecond = 59;
  }
  else{
    currentSecond--;
  }

  showCurrentTime(currentMinute, currentSecond);
}

function showCurrentTime(minute, second){
  var formatedTime = getFormatedTime(minute, second);
  
  timer.textContent = formatedTime;
  
  document.title = formatedTime + ' scrum timer';
}

function getFormatedTime(minute, second) {
  return (minute<10?"0" + minute:minute) + ":" + (second<10?"0" + second:second) 
}

function initTimer() {
  currentMinute = rangeMinutes.defaultValue;
  currentSecond = 0;
}

function setCurrentsFromSelectedRange() {
  currentMinute = rangeMinutes.value;
  currentSecond = 0;
}

function UpdateTimeRange() {
  if (!isRunning){
    setCurrentsFromSelectedRange();
    showCurrentTime(currentMinute, currentSecond);
    sliderMinutes.textContent = getFormatedTime(currentMinute, currentSecond) + ' min'
  }
}

function ShowModal(){
  rangeMinutes.disabled = isRunning === true ? true : false;
  
  modal.style.display = "block";
}

function CloseSettings() {
  modal.style.display = "none";
}