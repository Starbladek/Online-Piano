var playbackController = (function() {

  let currentMeasure = 0;
  let currentNote = 0;
  let timerLength = 1000;
  let timerHolder;
  let playbackActive = false;

  let measures = [];
  let mViews = [];

  function initializePlaybackControls() {
    console.log("Initializing playback controls...");
    document.getElementById("play-button").addEventListener("click", playNotes);
    document.getElementById("stop-button").addEventListener("click", stopNotes);
  }



  function playNotes(event) {
    measures = measureController.getMeasures();
    mViews = measureController.getMViews();

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
      if (currentNote > 0) uncolorPreviousNote();
      currentNote = 0;
      currentMeasure = 0;
    } else {
      console.log("The notes aren't playing, silly");
    }
  }

  function playCurrentNote() {
    //This conditional is just so we don't try to uncolor index -1 when currentNote = 0
    if (currentNote > 0) uncolorPreviousNote();
    mViews[currentMeasure].colorPlaybackNote(currentNote);

    if (measures[currentMeasure].getNotes()[currentNote].noteName != "Rest") {
      let sound = new Audio("sounds/" + measures[currentMeasure].getNotes()[currentNote].noteName + ".mp3");
      sound.play();
    }
    currentNote++;

    if (currentNote >= measures[currentMeasure].getNotes().length) {
      uncolorPreviousNote();
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

  function uncolorPreviousNote() {
    if (measureController.getCurrentMeasure() == currentMeasure && measureController.getCurrentNote() == currentNote - 1)
      mViews[currentMeasure].colorSelectedNote(currentNote - 1);
    else
      mViews[currentMeasure].uncolorPlaybackNote(currentNote - 1);
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
