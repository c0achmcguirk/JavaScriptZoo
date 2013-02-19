/// <reference path="./jquery.d.ts"/>
var runMe = function () {
  var animal = "Rhino";
  var numberOfLegs = 4;
  var rhino = {
    type: animal,
    numLegs: numberOfLegs
  }
  rhino.type = "Rhino";
  alert("The " + rhino.type + " has " + rhino.numLegs + " legs.");
}

$(document).ready(function () {
  $('#btn-run-type').on('click', function () {
    runMe();
  });
});