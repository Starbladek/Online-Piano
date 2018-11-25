var bpmController = (function() {

  let bpm = 120;
  let bpmMin;
  let bpmMax;

  function initializeBPMCounter() {
    console.log("Initializing BPM controls...");
    var bpmCounter = document.getElementById("bpm-counter");
    bpmMin = bpmCounter.min;
    bpmMax = bpmCounter.max;
    bpmCounter.value = bpm;
    document.getElementById("bpm-counter").addEventListener("change", checkIfBPMIsInBounds);
  }



  function checkIfBPMIsInBounds(event) {
    let value = parseInt(event.target.value);
    let min = parseInt(event.target.min);
    let max = parseInt(event.target.max);

    if (value < min) {
      event.target.value = event.target.min;
    }
    else if (value > max) {
      event.target.value = event.target.max;
    }
  }



  return {
    initializeBPMCounter: initializeBPMCounter
  };

})();
