var keyNotes = [
  'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
  'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
  'C5'
];
var keyHTMLObjects = [];
var cNote = new Audio("");

var keyController = (function() {

  //Create HTML key image objects and give them a click listener
  function generateKeys() {
    createKeyObjects();
    assignKeysMouseDownListeners();
  }

  //Creates the HTML image objects and pushes them to the correct div
  function createKeyObjects() {
    for (var i = 0; i < keyNotes.length; i++) {
      var keyImage = document.createElement("IMG");
      keyImage.setAttribute("class", "key-class");
      keyImage.setAttribute("src", "images/test_piano_key.png");
      keyImage.setAttribute("alt", "Key" + i);
      document.getElementById("div-piano-key-area").appendChild(keyImage);
      keyHTMLObjects.push(keyImage);
    }
  }

  //Gives all keys a click listener which plays their note on click
  function assignKeysMouseDownListeners() {
    for (var i = 0; i < keyHTMLObjects.length; i++) {
      keyHTMLObjects[i].addEventListener('mousedown', playNote);
    }
  }

  //Play note assigned to key
  function playNote(event) {
    var p = event.target.parentElement;
    var index = Array.prototype.indexOf.call(p.children, event.target);
    console.log(keyNotes[index]);
    var sound = new Audio("sounds/" + keyNotes[index] + ".mp3")
    sound.play();
  }

  return {
    generateKeys: generateKeys
  }

})();
