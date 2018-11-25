var measureView = (function() {

  function MeasureView(newMeasure) {
    this.htmlMeasureContainer = document.getElementById("playback-measure-container");

    let newMeasureDiv = document.createElement("DIV");
    newMeasureDiv.setAttribute("class", "measure-display");
    newMeasureDiv.setAttribute("id", "main-measure");
    document.getElementById("playback-measure-container").appendChild(newMeasureDiv);

    for (let i = 0; i < newMeasure.getNotes().length; i++) {
      let newMeasureSpan = document.createElement("SPAN");
      newMeasureSpan.setAttribute("class", "measure-note");
      newMeasureSpan.innerHTML = newMeasure.getNotes()[i].noteName;
      newMeasureDiv.appendChild(newMeasureSpan);
    }
  }

  MeasureView.prototype.updateMeasure = function(measureModel) {
    let measureDiv = document.getElementById("main-measure");
    let noteNodes = measureDiv.childNodes;

    for (let i = 0; i < noteNodes.length; i++) {
      noteNodes[i].innerHTML = measureModel.getNotes()[i].noteName;
    }
  }

  return {
    MeasureView: MeasureView
  };

})();
