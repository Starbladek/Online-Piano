var playbackController = (function() {

  let notesToPlay = [];
  let currentNote = 0;
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
        timerHolder = setInterval(playCurrentNote, 1000);
        playbackActive = true;
      }
      else {
        console.log("The notes are already playing, silly");
      }
    }
    else {
      console.log("There are no notes to play, silly");
    }
  }

  function stopNotes(event) {
    console.log("stopping playback");
    clearInterval(timerHolder);
    playbackActive = false;
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
        playbackActive = false;
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
