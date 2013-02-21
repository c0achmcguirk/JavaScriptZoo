(function() {
  var runMe;

  runMe = function() {
    var animal;
    animal = {
      type: "monkey",
      numLegs: 4,
      other: function() {
        return "other";
      }
    };
    animal.type = 5;
    animal.numLegs = "4";
    animal.numLegs = null;
    animal.other = function() {
      return "other2";
    };
    if (animal.type === "monkey") {
      return alert("The " + animal.type + " has " + animal.numLegs + " legs. " + (animal.other()));
    } else {
      return alert("This is no monkey, what are you trying to pull?");
    }
  };

  this.wireUpEvents(runMe);

}).call(this);
