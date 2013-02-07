/// <reference path="./jquery.d.ts"/>
var runMe = function () {
  var animal = {
numLegs: 4,
        type: "monkey"
  }

  if (animal.type == "monkey") {
  alert("The " + animal.type + " has " + animal.numLegs + " legs");
  } else {
alert("This is no monkey, what are you trying to pull?");
  }
}

$(document).ready(function () {
  $('#btn-run-type').on('click', function () {
    runMe();
  });
});

