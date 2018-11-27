var measureView = (function() {

  function MeasureView(measureModel) {
    this.measureSelectedColor = "rgb(100, 100, 150)";
    this.quarterNoteBaseBGColor = "rgb(100, 100, 250)";
    this.otherNoteBaseBGColor = "rgb(150, 150, 200)";
    this.noteSelectedBGColor = "rgb(100, 0, 255)";
    this.notePlaybackBGColor = "rgb(0, 128, 0)";

    let newMeasureDiv = document.createElement("DIV");
    newMeasureDiv.setAttribute("class", "measure-display");
    newMeasureDiv.setAttribute("id", "measure");
    document.getElementById("playback-measure-container").appendChild(newMeasureDiv);

    for (let i = 0; i < measureModel.getNotes().length; i++) {
      let newMeasureSpan = document.createElement("SPAN");
      newMeasureSpan.setAttribute("class", "measure-note");
      newMeasureSpan.innerHTML = measureModel.getNotes()[i].noteName;

      if (i % 4 == 0)
        newMeasureSpan.style.backgroundColor = this.quarterNoteBaseBGColor;
      else
        newMeasureSpan.style.backgroundColor = this.otherNoteBaseBGColor;

      newMeasureDiv.appendChild(newMeasureSpan);
    }

    this.measureModel = measureModel;
    this.measureDiv = newMeasureDiv;
    this.noteNodes = newMeasureDiv.childNodes;
  }

  MeasureView.prototype.updateNote = function(noteIndex) {
    this.noteNodes[noteIndex].innerHTML = this.measureModel.getNotes()[noteIndex].noteName;
  };

  MeasureView.prototype.updateEntireMeasure = function(measureModel) {
    for (let i = 0; i < this.noteNodes.length; i++) {
      this.noteNodes[i].innerHTML = measureModel.getNotes()[i].noteName;
    }
  };



  MeasureView.prototype.colorMeasure = function() {
    this.measureDiv.style.backgroundColor = this.measureSelectedColor;
  }

  MeasureView.prototype.uncolorMeasure = function() {
    this.measureDiv.style.backgroundColor = "transparent";
  }

  MeasureView.prototype.colorSelectedNote = function(noteIndex) {
    this.noteNodes[noteIndex].style.backgroundColor = this.noteSelectedBGColor;
  };

  MeasureView.prototype.uncolorSelectedNote = function(noteIndex) {
    if (noteIndex % 4 == 0)
      this.noteNodes[noteIndex].style.backgroundColor = this.quarterNoteBaseBGColor;
    else
      this.noteNodes[noteIndex].style.backgroundColor = this.otherNoteBaseBGColor;
  };

  MeasureView.prototype.colorPlaybackNote = function(noteIndex) {
    this.noteNodes[noteIndex].style.backgroundColor = this.notePlaybackBGColor;
  };

  MeasureView.prototype.uncolorPlaybackNote = function(noteIndex) {
    if (noteIndex % 4 == 0)
      this.noteNodes[noteIndex].style.backgroundColor = this.quarterNoteBaseBGColor;
    else
      this.noteNodes[noteIndex].style.backgroundColor = this.otherNoteBaseBGColor;
  };



  MeasureView.prototype.removeMeasure = function() {
    this.measureDiv.parentNode.removeChild(this.measureDiv);
  };

  MeasureView.prototype.getMeasureDiv = function() {
    return this.measureDiv;
  };

  return {
    MeasureView: MeasureView
  };

})();
