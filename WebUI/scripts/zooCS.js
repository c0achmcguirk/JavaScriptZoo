(function() {
  var runMe;

  runMe = function() {
    var animal;
    animal = {
      type: "monkey",
      numLegs: 4
    };
    if (animal.type === "monkey") {
      return alert("The " + animal.type + " has " + animal.numLegs + " legs.");
    } else {
      return alert("This is no monkey, what are you trying to pull?");
    }
  };

  this.wireUpEvents(runMe);

}).call(this);
