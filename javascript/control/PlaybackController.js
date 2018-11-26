var playbackController = (function() {

  let currentMeasure = 0;
  let currentNote = 0;
  let timerLength = 1000;
  let timerHolder;
  let playbackActive = false;
  let measures = [];

  function initializePlaybackControls() {
    console.log("Initializing playback controls...");
    document.getElementById("play-button").addEventListener("click", playNotes);
    document.getElementById("stop-button").addEventListener("click", stopNotes);
  }



  function playNotes(event) {
    measures = measureController.getMeasures();
    if (!playbackActive) {
      console.log("Starting playback!");
      calculateTimerLength();
      timerHolder = setInterval(playCurrentNote, timerLength);
      playbackActive = true;
    } else {
      console.log("The notes are already playing, silly");
    }
  }

  function stopNotes(event) {
    if (playbackActive) {
      console.log("Stopping playback.");
      clearInterval(timerHolder);
      playbackActive = false;
      currentNote = 0;
    } else {
      console.log("The notes aren't playing, silly");
    }
  }

  function playCurrentNote() {
    if (currentNote < measureController.getMainMeasure().getNotes().length) {
      if (measureController.getMainMeasure().getNotes()[currentNote].noteName != "Rest") {
        let sound = new Audio("sounds/" + measureController.getMainMeasure().getNotes()[currentNote].noteName + ".mp3");
        sound.play();
      }
      currentNote++;
    } else {
      currentNote = 0;
      //If we should loop, play through the notes again
      if (document.getElementById("loop-checkbox").checked) {
        if (measureController.getMainMeasure().getNotes()[currentNote].noteName != "Rest") {
          let sound = new Audio("sounds/" + measureController.getMainMeasure().getNotes()[currentNote].noteName + ".mp3");
          sound.play();
        }
        currentNote++;
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



  return {
    initializePlaybackControls: initializePlaybackControls
  };

})();
