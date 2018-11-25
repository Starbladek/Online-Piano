var measureController = (function() {

  let mainMeasure;
  let mView;
  let currentNote = 0;

  function initializeMainMeasure() {
    console.log("Initializing main measure...");
    mainMeasure = new measureModel.Measure();
    mView = new measureView.MeasureView(mainMeasure);
  }

  function updateMainMeasure(noteToUpdate) {
    if (currentNote < 8) {
      mainMeasure.getNotes()[currentNote] = noteToUpdate;
      mView.updateMeasure(mainMeasure);
      currentNote++;
    }
  }

  function resetMainMeasure() {
    currentNote = 0;
    mainMeasure.clearNotes();
    mView.updateMeasure(mainMeasure);
  }

  function getMainMeasure() {
    return mainMeasure;
  }



  return {
    initializeMainMeasure: initializeMainMeasure,
    updateMainMeasure: updateMainMeasure,
    resetMainMeasure: resetMainMeasure,
    getMainMeasure: getMainMeasure
  };

})();
