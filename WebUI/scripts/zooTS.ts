/// <reference path="./jquery.d.ts"/>
this.name = "Bill";

var runMe = function () {
  var giraffe = {
    name: "Jeffrey",
    type: "Giraffe",
    numSpots: 10,
    eat: function () {
      alert(this.name + " the " + this.type + " (with " + this.numSpots +
        " spots) is eating.");
      setTimeout(function () {
        alert(this.name + " the " + this.type + " (with " + this.numSpots +
          " spots) is still eating, 2 seconds later.");
      }, 2000);
    }
  }

  giraffe.eat();

};

$(document).ready(function () {
  $('#btn-run-type').on('click', function () {
    runMe();
  });
});