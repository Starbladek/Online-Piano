var measureController = (function() {

  let measures = [];
  let mViews = [];

  let currentMeasure = 0;
  let currentNote = 0;

  function initializeMeasureController() {
    console.log("Initializing main measure...");

    document.getElementById("add-measure-button").addEventListener("click", createNewMeasure);
    document.getElementById("remove-measure-button").addEventListener("click", removeLastMeasure);
    document.getElementById("reset-button").addEventListener("click", clearAllMeasures);

    createNewMeasure();
    colorCurrentMeasureAndNote();
  }



  function createNewMeasure() {
    if (!playbackController.getPlaybackActive()) {
      measures.push(new measureModel.Measure());
      mViews.push(new measureView.MeasureView(measures[measures.length - 1]));

      let newNoteNodes = mViews[mViews.length - 1].getMeasureDiv().childNodes;
      for (let i = 0; i < newNoteNodes.length; i++) {
        newNoteNodes[i].addEventListener("click", setCurrentNoteAndMeasure);
      }
    }
  }

  function removeLastMeasure() {
    if (!playbackController.getPlaybackActive()) {
      if (measures.length > 1) {
        mViews[mViews.length - 1].removeMeasure();
        measures.pop();
        mViews.pop();

        //This is to make sure the user doesn't stay on the measure we just deleted
        if (currentMeasure > measures.length - 1) {
          currentMeasure = measures.length - 1;
        }

        colorCurrentMeasureAndNote();
      }
    }
  }

  function clearAllMeasures(event) {
    if (!playbackController.getPlaybackActive()) {
      uncolorCurrentMeasureAndNote();
      currentMeasure = 0;
      currentNote = 0;
      colorCurrentMeasureAndNote();

      for (let i = 0; i < measures.length; i++) {
        resetMeasure(i);
      }
    }
  }



  function updateMeasure(note) {
    measures[currentMeasure].getNotes()[currentNote] = note;
    mViews[currentMeasure].updateNote(currentNote);
  }

  function setCurrentNoteAndMeasure(event) {
    uncolorCurrentMeasureAndNote();

    let selectedMeasure = event.target.parentElement;
    let selectedMeasureParent = selectedMeasure.parentElement;
    let measureIndex = Array.prototype.indexOf.call(selectedMeasureParent.children, selectedMeasure);
    currentMeasure = measureIndex;

    let selectedNote = event.target;
    let noteIndex = Array.prototype.indexOf.call(selectedMeasure.children, selectedNote);
    currentNote = noteIndex;

    colorCurrentMeasureAndNote();
  }

  function uncolorCurrentMeasureAndNote() {
    mViews[currentMeasure].uncolorMeasure();
    mViews[currentMeasure].uncolorSelectedNote(currentNote);
  }

  function colorCurrentMeasureAndNote() {
    mViews[currentMeasure].colorMeasure();
    mViews[currentMeasure].colorSelectedNote(currentNote);
  }

  function resetMeasure(measureIndex) {
    measures[measureIndex].clearNotes();
    mViews[measureIndex].updateEntireMeasure(measures[measureIndex]);
  }



  function getMeasures() {
    return measures;
  }

  function getMViews() {
    return mViews;
  }

  function getCurrentMeasure() {
    return currentMeasure;
  }

  function getCurrentNote() {
    return currentNote;
  }



  return {
    initializeMeasureController: initializeMeasureController,
    updateMeasure: updateMeasure,
    getMeasures: getMeasures,
    getMViews: getMViews,
    getCurrentMeasure: getCurrentMeasure,
    getCurrentNote: getCurrentNote
  };

})();
