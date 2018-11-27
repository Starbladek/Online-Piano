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
      playbackActive = true;
      playCurrentNote();

      calculateTimerLength();
      timerHolder = setInterval(playCurrentNote, timerLength);
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
      currentMeasure = 0;
    } else {
      console.log("The notes aren't playing, silly");
    }
  }

  function playCurrentNote() {
    if (measures[currentMeasure].getNotes()[currentNote].noteName != "Rest") {
      let sound = new Audio("sounds/" + measures[currentMeasure].getNotes()[currentNote].noteName + ".mp3");
      sound.play();
    }
    currentNote++;

    if (currentNote >= measures[currentMeasure].getNotes().length) {
      currentNote = 0;
      currentMeasure++;

      //If we just finished the last measure, loop or end the interval
      if (currentMeasure >= measures.length) {
        currentMeasure = 0;

        //If loop box is not checked, end the interval
        if (!document.getElementById("loop-checkbox").checked) {
          console.log("Finished playback.");
          clearInterval(timerHolder);
          playbackActive = false;
        }
      }
    }
  }

  function calculateTimerLength() {
    let bpm = parseInt(document.getElementById("bpm-counter").value);
    timerLength = 60000 / (bpm * (measureModel.getMeasureLength()/4));
  }

  function getPlaybackActive() {
    return playbackActive;
  }



  return {
    initializePlaybackControls: initializePlaybackControls,
    getPlaybackActive: getPlaybackActive
  };

})();
