var measureController = (function() {

  let measures = [];
  let mView = [];

  let numberOfMeasures = 0;
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
      measures[numberOfMeasures] = new measureModel.Measure();
      mView[numberOfMeasures] = new measureView.MeasureView(measures[numberOfMeasures]);
      numberOfMeasures++;
    }
  }

  function removeLastMeasure() {
    if (!playbackController.getPlaybackActive()) {
      if (numberOfMeasures > 1) {
        numberOfMeasures--;
        //If our current note was on the measure we're deleting,
        //set the currentMeasure and currentNote to the end of the
        //penultimate measure
        if (currentMeasure >= numberOfMeasures) {
          currentMeasure--;
          currentNote = measureModel.getMeasureLength();
        }
        mView[numberOfMeasures].removeMeasure();
        measures.splice(numberOfMeasures, 1);
        mView.splice(numberOfMeasures, 1);
      }
    }
  }

  function clearAllMeasures(event) {
    if (!playbackController.getPlaybackActive()) {
      currentMeasure = 0;
      currentNote = 0;

      for (let i = 0; i < numberOfMeasures; i++) {
        resetMeasure(i);
      }
    }
  }



  function updateMeasure(note) {
    if (currentNote < measureModel.getMeasureLength()) {
      measures[currentMeasure].getNotes()[currentNote] = note;
      mView[currentMeasure].updateMeasure(measures[currentMeasure]);
      currentNote++;
    } else {
      //Add one here so we don't go out of bounds
      if (currentMeasure + 1 < numberOfMeasures) {
        currentMeasure++;
        currentNote = 0;

        measures[currentMeasure].getNotes()[currentNote] = note;
        mView[currentMeasure].updateMeasure(measures[currentMeasure]);
        currentNote++;
      }
    }
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
