/// <reference path="./jquery.d.ts"/>

class Horse {
  fullName: string;
  constructor(public numberOfLegs: number, public name: string, public voice: string) {
    this.fullName = name + " is my name";
  }

  about() {
    return "This is a " + this.name + " with " + this.numberOfLegs + " legs, he says " + this.voice;
  }
}

var testMethod = function (val1 = "val1", val2 = "val2") {
  alert("" + val1 + " " + val2);
}

var runMe = function () {
  var horace = new Horse(4, "horse", "neigh!");
  var horace2 = new Horse(5, "horace", "blah");
  alert(horace.about());
  testMethod();
  testMethod(void 0, null);
}

$(document).ready(function () {
  $('#btn-run-type').on('click', function () {
    runMe();
  });
});

