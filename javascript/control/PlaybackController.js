var playbackController = (function() {

  let notesToPlay = [];
  let currentNote = 0;
  let timerLength = 1000;
  let timerHolder;
  let playbackActive = false;

  function initializePlaybackControls() {
    console.log("Initializing playback controls...");
    document.getElementById("reset-button").addEventListener("click", clearNotes);
    document.getElementById("play-button").addEventListener("click", playNotes);
    document.getElementById("stop-button").addEventListener("click", stopNotes);
  }



  function clearNotes(event) {
    notesToPlay = [];
    clearInterval(timerHolder);
    playbackActive = false;
    currentNote = 0;
    console.log(notesToPlay);
  }

  function playNotes(event) {
    if (notesToPlay.length > 0) {
      if (!playbackActive) {
        console.log("playing notes");
        calculateTimerLength();
        timerHolder = setInterval(playCurrentNote, timerLength);
        playbackActive = true;
      } else {
        console.log("The notes are already playing, silly");
      }
    } else {
      console.log("There are no notes to play, silly");
    }
  }

  function stopNotes(event) {
    if (playbackActive) {
      console.log("stopping playback");
      clearInterval(timerHolder);
      playbackActive = false;
      currentNote = 0;
    }
    else {
      console.log("The notes aren't playing, silly");
    }
  }

  //Plays current note and moves forward one note
  function playCurrentNote() {
    if (currentNote < notesToPlay.length) {
      if (notesToPlay[currentNote] != "Rest") {
        let sound = new Audio("sounds/" + notesToPlay[currentNote] + ".mp3");
        sound.play();
      }
      currentNote++;
    } else {
      currentNote = 0;
      //If we should loop, play through the notes again
      if (document.getElementById("loop-checkbox").checked) {
        if (notesToPlay[currentNote] != "Rest") {
          let sound = new Audio("sounds/" + notesToPlay[currentNote] + ".mp3");
          sound.play();
        }
        currentNote++;
      }
      //Else, end the interval
      else {
        clearInterval(timerHolder);
        playbackActive = false;
      }
    }
  }

  function calculateTimerLength() {
    let bpm = parseInt(document.getElementById("bpm-counter").value);
    timerLength = 60000 / bpm;
  }

  function getNotesToPlay() {
    return notesToPlay;
  }



  return {
    initializePlaybackControls: initializePlaybackControls,
    getNotesToPlay: getNotesToPlay
  };

})();
