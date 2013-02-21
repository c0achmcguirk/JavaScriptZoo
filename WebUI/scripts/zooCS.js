(function() {
  var runMe;

  runMe = function() {
    var animal, numberOfLegs, rhino;
    animal = "Rhino";
    numberOfLegs = 4;
    rhino = {
      type: animal,
      numLegs: numberOfLegs
    };
    if (rhino.numLegs === 4) {
      alert("Has 4");
    } else {
      alert("Not 4");
    }
    if (rhino.numLegs !== 4) {
      return alert("Not correct");
    }
  };

  this.wireUpEvents(runMe);

}).call(this);
