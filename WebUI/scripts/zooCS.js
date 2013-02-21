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
    return alert("The " + rhino.type + " has " + rhino.numLegs + " legs.");
  };

  this.wireUpEvents(runMe);

}).call(this);
