var listOfKeyModels = [];

var keyModel = (function() {

  function KeyModel(keyType) {
    this.keyType = keyType;
  }

  KeyModel.prototype.getKeyType = function() {
    return "Key = " + this.keyType;
  };

})();
