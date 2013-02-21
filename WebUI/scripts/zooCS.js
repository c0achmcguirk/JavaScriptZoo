(function() {
  var runMe, runMe2;

  runMe = function() {
    var animal, animalText, animals, _i, _j, _len, _len1;
    animals = ["giraffe", "lion", "horse", "sloth"];
    animalText = "";
    for (_i = 0, _len = animals.length; _i < _len; _i++) {
      animal = animals[_i];
      animalText += "Putting " + animal + " into the cage.\r";
    }
    alert("Caged ALL:\r\r" + animalText);
    animalText = "";
    for (_j = 0, _len1 = animals.length; _j < _len1; _j++) {
      animal = animals[_j];
      if (animal !== "lion") {
        animalText += "Putting " + animal + " into the cage.\r";
      }
    }
    return alert("Caged Some:\r\r" + animalText);
  };

  runMe2 = function() {
    var age, i, numberOfPeacocks, x, _i, _j;
    age = "";
    for (x = _i = 1; _i <= 35; x = ++_i) {
      age += "" + x + "..";
    }
    alert("How the elephant has aged: " + age);
    numberOfPeacocks = "";
    for (i = _j = 97; _j >= 14; i = _j += -3) {
      numberOfPeacocks += "" + i + "..";
    }
    return alert("Number of peacocks:\r\r" + numberOfPeacocks);
  };

  this.wireUpEvents(runMe, runMe2);

}).call(this);
