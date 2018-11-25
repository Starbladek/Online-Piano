var playbackController = (function() {

  let notesToPlay = [];
  let currentNote = 0;
  let timerHolder;

  function initializePlaybackControls() {
    console.log("Initializing playback controls...");
    document.getElementById("reset-button").addEventListener("click", clearNotes);
    document.getElementById("play-button").addEventListener("click", playNotes);
    document.getElementById("stop-button").addEventListener("click", stopNotes);
  }



  function clearNotes(event) {
    notesToPlay = [];
    clearInterval(timerHolder);
    currentNote = 0;
    console.log(notesToPlay);
  }

  function playNotes(event) {
    console.log("playing notes");
    timerHolder = setInterval(playCurrentNote, 1000);
  }

  function stopNotes(event) {
    console.log("stopping playback");
    clearInterval(timerHolder);
    currentNote = 0;
  }

  //Plays current note and moves forward one note
  function playCurrentNote() {
    if (currentNote < notesToPlay.length) {
      let sound = new Audio("sounds/" + notesToPlay[currentNote] + ".mp3");
      sound.play();
      currentNote++;
    }
    else {
      currentNote = 0;
      //If we should loop, play through the notes again
      if (document.getElementById("loop-checkbox").checked) {
        let sound = new Audio("sounds/" + notesToPlay[currentNote] + ".mp3");
        sound.play();
        currentNote++;
      }
      //Else, end the interval
      else {
        clearInterval(timerHolder);
      }
    }
  }

  function getNotesToPlay() {
    return notesToPlay;
  }



  return {
    initializePlaybackControls: initializePlaybackControls,
    getNotesToPlay: getNotesToPlay
  };

})();
