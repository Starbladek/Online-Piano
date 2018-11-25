var playbackController = (function() {

  var notesToPlay = [];
  var currentNote = 0;

  function initializePlaybackControls() {
    console.log("Initializing playback controls...");
    document.getElementById("reset-button").addEventListener("click", clearNotes);
    document.getElementById("play-button").addEventListener("click", playNotes);
    document.getElementById("stop-button").addEventListener("click", stopNotes);
  }



  function clearNotes(event) {
    notesToPlay = [];
  }

  function playNotes(event) {
    console.log("playing notes :^)");
    setInterval(loopThroughNotes, 1000);
  }

  function stopNotes(event) {
    console.log("stopping notes??");
  }

  function loopThroughNotes() {

  }



  return {
    notesToPlay: notesToPlay,
    initializePlaybackControls: initializePlaybackControls
  };

})();
