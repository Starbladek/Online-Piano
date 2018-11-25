var playbackController = (function() {

  let currentNoteToPlay = 0;
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
    clearInterval(timerHolder);
    playbackActive = false;
    currentNoteToPlay = 0;
    measureController.resetMainMeasure();
  }

  function playNotes(event) {
    if (measureController.getMainMeasure().getNotes().length > 0) {
      if (!playbackActive) {
        console.log("Starting playback!");
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
      console.log("Stopping playback.");
      clearInterval(timerHolder);
      playbackActive = false;
      currentNoteToPlay = 0;
    }
    else {
      console.log("The notes aren't playing, silly");
    }
  }

  function playCurrentNote() {
    if (currentNoteToPlay < measureController.getMainMeasure().getNotes().length) {
      if (measureController.getMainMeasure().getNotes()[currentNoteToPlay].noteName != "Rest") {
        let sound = new Audio("sounds/" + measureController.getMainMeasure().getNotes()[currentNoteToPlay].noteName + ".mp3");
        sound.play();
      }
      currentNoteToPlay++;
    } else {
      currentNoteToPlay = 0;
      //If we should loop, play through the notes again
      if (document.getElementById("loop-checkbox").checked) {
        if (measureController.getMainMeasure().getNotes()[currentNoteToPlay].noteName != "Rest") {
          let sound = new Audio("sounds/" + measureController.getMainMeasure().getNotes()[currentNoteToPlay].noteName + ".mp3");
          sound.play();
        }
        currentNoteToPlay++;
      }
      //Else, end the interval
      else {
        console.log("Finished playback.");
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
    initializePlaybackControls: initializePlaybackControls
  };

})();
