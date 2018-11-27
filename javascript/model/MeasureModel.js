var measureModel = (function() {

  let measureLength = 4;

  function Measure() {
    this.notes = [];
    for (let i = 0; i < measureLength; i++) {
      this.notes.push(new noteModel.Note("Rest"));
    }
  }

  function getMeasureLength() {
    return measureLength;
  }

  Measure.prototype.getNotes = function() {
    return this.notes;
  };

  Measure.prototype.clearNotes = function() {
    for (let i = 0; i < this.notes.length; i++) {
      this.notes[i].noteName = "Rest";
    }
  }

  return {
    Measure: Measure,
    getMeasureLength: getMeasureLength
  };

})();
