(function() {
  var describe, runMe;

  runMe = function() {
    var animals;
    animals = [
      {
        name: "harry",
        type: "horse"
      }, {
        name: "edgar",
        type: "eagle"
      }, {
        name: "alice",
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
