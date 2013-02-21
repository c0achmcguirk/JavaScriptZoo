/// <reference path="./jquery.d.ts"/>
var runMe = function () {
  var animals = ["giraffe", "lion", "horse", "sloth"];

  var animalText = ""
  // put them all in there
  for (var i = 0, len = animals.length; i < len; i++) {
    var animal = animals[i];
    animalText += "Putting " + animal + " into its cage.\r";
  }

  alert("Caged ALL:\r\r" + animalText);

  animalText = "";
  // wait, we won't allow lions in there!
  for (var i = 0, len = animals.length; i < len; i++) {
    animal = animals[i];
    if (animal !== "lion") {
      animalText += "Putting " + animal + " into its cage.\r";
    }
  }

  alert("Caged some:\r\r" + animalText);
};

var runMe2 = function () {
  // countup
  var age = ""
  for (var x = 1; x < 35; x++) {
    age += x + "..";
  }
    
  alert("How the elephant has aged: " + age);

  // weird countdown
  var numberOfPeacocks = ""
  for (var i = 97; i >= 14; i -= 3) {
    numberOfPeacocks += i + "..";
  }

  alert("Number of peacocks:\r\r" + numberOfPeacocks);
}
this.wireUpEvents(runMe, runMe2);