/// <reference path="./jquery.d.ts"/>
interface IAnimal {
  numLegs: number;
  type: string;
  other: any;
}

var runMe = function () {
  var numLegs: number = 4;
  var type: string = "monkey"

  //var animal: IAnimal;
  var animal: IAnimal = {
    numLegs: numLegs,
    type: type,
    other: function () { return "other"; }
  };

  animal.numLegs = numLegs + 2;
  animal.type = "monkey";
  animal.other = function () { return "other again"; };

  if (animal.type == "monkey") {
    alert("The " + animal.type + " has " + animal.numLegs + " legs. " + animal.other());
  } else {
    alert("This is no monkey, what are you trying to pull?");
  }
}

this.wireUpEvents(runMe);
