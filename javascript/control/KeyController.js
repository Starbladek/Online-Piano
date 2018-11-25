var keyNotes = [
  'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
  'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
  'C5'
];
var keyHTMLObjects = [];

var keyController = (function() {

  function initializeKeyboard() {
    console.log("Initializing keyboard...");
    generateKeys();
    generateRestKey();
  }

  //Creates the HTML image objects and pushes them to the correct div
  function generateKeys() {
    for (var i = 0; i < keyNotes.length; i++) {
      var keyImage = document.createElement("IMG");
      keyImage.setAttribute("class", "key-class");
      keyImage.setAttribute("src", "images/test_piano_key.png");
      keyImage.setAttribute("alt", "Key" + i);

      keyImage.addEventListener('mousedown', playNote);
      keyImage.addEventListener('mouseup', unpressKeyImg);
      keyImage.addEventListener('mouseleave', unpressKeyImg);

      document.getElementById("piano-keys-container").appendChild(keyImage);
      keyHTMLObjects.push(keyImage);
    }
  }

  function generateRestKey() {
    var restButton = document.createElement("IMG");
    restButton.setAttribute("src", "images/test_piano_key.png");
    restButton.setAttribute("alt", "RestKey");

    restButton.addEventListener('mousedown', pressKeyImg);
    restButton.addEventListener('mouseup', unpressKeyImg);
    restButton.addEventListener('mouseleave', unpressKeyImg);

    document.getElementById("rest-button-container").appendChild(restButton);
  }



  //Play note assigned to key
  function playNote(event) {
    pressKeyImg(event);
    var p = event.target.parentElement;
    var index = Array.prototype.indexOf.call(p.children, event.target);
    //console.log(keyNotes[index]);
    var sound = new Audio("sounds/" + keyNotes[index] + ".mp3");
    sound.play();

    if (playbackController.notesToPlay.length < 8) {
      playbackController.notesToPlay.push(keyNotes[index]);
      console.log(playbackController.notesToPlay);
    }
  }

  function pressKeyImg(event) {
    event.target.setAttribute("src", "images/test_piano_key_pressed.png");
  }

  function unpressKeyImg(event) {
    event.target.setAttribute("src", "images/test_piano_key.png");
  }



  return {
    initializeKeyboard: initializeKeyboard
  };

})();
