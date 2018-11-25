var measureModel = (function() {

  function Measure() {
    this.notes = [];
    for (let i = 0; i < 8; i++) {
      this.notes.push(new noteModel.Note("Rest"));
    }
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
    Measure: Measure
  };

})();
