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
      let keyImage = document.createElement("IMG");
      keyImage.setAttribute("class", "key-class");
      keyImage.setAttribute("src", "images/test_piano_key.png");
      keyImage.setAttribute("alt", "Key" + i);

      keyImage.addEventListener('mousedown', playNote);
      keyImage.addEventListener('mouseup', unpressKeyImg);
      keyImage.addEventListener('mouseleave', unpressKeyImg);

      document.getElementById("key-container").appendChild(keyImage);
      keyHTMLObjects.push(keyImage);
    }
  }

  function generateRestKey() {
    let restButton = document.createElement("button");
    restButton.setAttribute("class", "rest-button");
    restButton.innerHTML = "Rest!";
    restButton.addEventListener('click', addRest);
    document.getElementById("rest-container").appendChild(restButton);
  }



  //Play note assigned to key
  function playNote(event) {
    pressKeyImg(event);
    let p = event.target.parentElement;
    let index = Array.prototype.indexOf.call(p.children, event.target);
    //console.log(keyNotes[index]);
    let sound = new Audio("sounds/" + keyNotes[index] + ".mp3");
    sound.play();

    let notesToPlay = playbackController.getNotesToPlay();
    if (notesToPlay.length < 8) {
      notesToPlay.push(keyNotes[index]);
      console.log(notesToPlay);
    }
  }

  function addRest(event) {
    let notesToPlay = playbackController.getNotesToPlay();
    if (notesToPlay.length < 8) {
      notesToPlay.push("Rest");
      console.log(notesToPlay);
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
