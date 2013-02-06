(function() {
  var runMe;

  runMe = function() {
    var animal, numberOfLegs;
    animal = "Rhino";
    numberOfLegs = 4;
    return alert("The " + animal + " has " + numberOfLegs + " legs.");
  };

  $(document).ready(function() {
    return $('#btn-run-coffee').on('click', function() {
      return runMe();
    });
  });

}).call(this);
