//jshint esversion : 6

const EVENTS = {
  DOM_LOADED: "DOMContentLoaded",
  CLICK: "click"
};


window.addEventListener(EVENTS.DOM_LOADED, start);

function makeSoundAndMakeAnimation(event) {
  let buttonInnerHtml = event.target.innerHTML;
  console.log(buttonInnerHtml);
  makeSound(buttonInnerHtml);
  buttonAnimation(buttonInnerHtml);

}

function start() {
  updateDateTime();
  // press button to get sound
  let elements = document.querySelectorAll(".tool");
  for (var i = 0; i < (elements).length; i++) {
    elements[i].addEventListener("click", makeSoundAndMakeAnimation);
  }

  // press keyboard to get sound
  document.addEventListener("keydown", function(event) {
    var keyboard = event.key;
    makeSound(keyboard);
    buttonAnimation(keyboard);
  });


  document.querySelector(".play").addEventListener("click", function() {
    console.log("played");
    buttonplay();
    timer();
  });


  document.querySelector(".record").addEventListener("click", function() {
    console.log("start record");
    recordAudio();
    timer();
  });

}

function playAudio(filename) {
  let audio = new Audio(filename);
  audio.play();
}

function makeSound(keyword) {

  switch (keyword) {
    case "w":
      playAudio('sounds/drum1.mp3');
      break;

    case "a":
      playAudio('sounds/drum2.mp3');
      break;

    case "s":
      playAudio('sounds/drum3.mp3');
      break;

    case "d":
      playAudio('sounds/drum4.mp3');
      break;

    case "j":
      playAudio('sounds/crash.mp3');
      break;

    case "k":
      playAudio('sounds/bass.mp3');
      break;

    case "l":
      playAudio('sounds/snare.mp3');
      break;
    default:

  }
}


function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

function buttonplay(){
  const player = document.querySelector("#player");
  if(!player.dataset.url) {
    console.log("No Recorded Media");
    return;
  }

  const audio = new Audio(player.dataset.url);
  audio.play();

  var played = document.querySelector(".play");
  played.classList.add("pressed");

  setTimeout(function() {
    played.classList.remove("pressed");
  }, 10000);

}

function recordAudio(){
  let player = document.querySelector("#player");
  navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    const audioPartitions = [];
    mediaRecorder.addEventListener("dataavailable", event => {
      audioPartitions.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioPartitions);
      player.dataset.url = URL.createObjectURL(audioBlob);
    });
    var records = document.querySelector(".record");
    records.classList.add("pressed");

    setTimeout(() => {
      records.classList.remove("pressed");
      mediaRecorder.stop();
    }, 10000);
  });

}

const addZero = function (i){
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};


const updateDateTime = function() {
  const now = new Date();
  showTime(now.getHours(), now.getMinutes(), now.getSeconds());
  showDate(now.getMonth() + 1, now.getDate(), now.getFullYear());
  setTimeout(updateDateTime, 1000);
};

const showTime = function(hours, minutes, seconds) {
  document.getElementById('current_time').innerHTML = `<h4>${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}</h4>`;
};
const showDate = function(month, date, fullYear) {
  document.getElementById('current_date').innerHTML = `<h4>${month}/${date}/${fullYear}</h4>`;
};

function timer(){
  var seconds = 10;
  var countdown = setInterval(function() {
      seconds--;
      document.getElementById("countdown").textContent = seconds;
      if (seconds <= 0)
      {
        clearInterval(countdown);
        document.getElementById("countdown").textContent = "";

      }
      }, 1000);

}
