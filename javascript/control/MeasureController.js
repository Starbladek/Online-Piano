var measureController = (function() {

  let measures = [];
  let mView = [];

  let currentMeasure = 0;
  let currentNote = 0;

  function initializeMeasureController() {
    console.log("Initializing main measure...");

    document.getElementById("add-measure-button").addEventListener("click", createNewMeasure);
    document.getElementById("remove-measure-button").addEventListener("click", removeLastMeasure);
    document.getElementById("reset-button").addEventListener("click", clearAllMeasures);

    createNewMeasure();
  }



  function createNewMeasure() {
    if (!playbackController.getPlaybackActive()) {
      measures.push(new measureModel.Measure());
      mView.push(new measureView.MeasureView(measures[measures.length - 1]));

      let newNoteNodes = mView[mView.length - 1].getMeasureDiv().childNodes;
      for (let i = 0; i < newNoteNodes.length; i++) {
        newNoteNodes[i].addEventListener("click", setCurrentNote);
      }
    }
  }

  function removeLastMeasure() {
    if (!playbackController.getPlaybackActive()) {
      if (measures.length > 1) {
        mView[mView.length - 1].removeMeasure();
        measures.pop();
        mView.pop();
      }
    }
  }

  function clearAllMeasures(event) {
    if (!playbackController.getPlaybackActive()) {
      currentMeasure = 0;
      currentNote = 0;

      for (let i = 0; i < measures.length; i++) {
        resetMeasure(i);
      }
    }
  }



  function updateMeasure(note) {
    measures[currentMeasure].getNotes()[currentNote] = note;
    mView[currentMeasure].updateMeasure(measures[currentMeasure]);
  }

  function setCurrentNote(event) {
    let p = event.target.parentElement;
    let index = Array.prototype.indexOf.call(p.children, event.target);
    currentNote = index;
  }

  function resetMeasure(index) {
    measures[index].clearNotes();
    mView[index].updateMeasure(measures[index]);
  }

  function getMeasures() {
    return measures;
  }



  return {
    initializeMeasureController: initializeMeasureController,
    updateMeasure: updateMeasure,
    getMeasures: getMeasures
  };

})();
