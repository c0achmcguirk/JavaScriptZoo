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

var runMe = function () {
  var horace = new Horse(4, "horse", "neigh!");
  alert(horace.about());
}

$(document).ready(function () {
  $('#btn-run-type').on('click', function () {
    runMe();
  });
});
