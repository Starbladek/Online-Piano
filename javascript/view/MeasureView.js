var measureView = (function() {

  function MeasureView(measureModel) {
    let newMeasureDiv = document.createElement("DIV");
    newMeasureDiv.setAttribute("class", "measure-display");
    newMeasureDiv.setAttribute("id", "measure");
    document.getElementById("playback-measure-container").appendChild(newMeasureDiv);

    for (let i = 0; i < measureModel.getNotes().length; i++) {
      let newMeasureSpan = document.createElement("SPAN");
      newMeasureSpan.setAttribute("class", "measure-note");
      newMeasureSpan.innerHTML = measureModel.getNotes()[i].noteName;
      newMeasureDiv.appendChild(newMeasureSpan);
    }

    this.measureDiv = newMeasureDiv;
  }

  MeasureView.prototype.updateMeasure = function(measureModel) {
    let noteNodes = this.measureDiv.childNodes;

    for (let i = 0; i < noteNodes.length; i++) {
      noteNodes[i].innerHTML = measureModel.getNotes()[i].noteName;
    }
  };

  MeasureView.prototype.removeMeasure = function() {
    this.measureDiv.parentNode.removeChild(this.measureDiv);
  };

  return {
    MeasureView: MeasureView
  };

})();
