(function() {
  var describe, runMe;

  runMe = function() {
    var animals;
    animals = [
      {
        name: "bill",
        type: "horse"
      }, {
        name: "prasad",
        type: "eagle"
      }, {
        name: "jill",
        type: "antelope"
      }
    ];
    return describe(animals);
  };

  describe = function(animals) {
    var animal, _i, _len;
    for (_i = 0, _len = animals.length; _i < _len; _i++) {
      animal = animals[_i];
      alert("This is " + animal.name + ", which is a " + animal.type);
    }
  };

  this.wireUpEvents(runMe);

}).call(this);
