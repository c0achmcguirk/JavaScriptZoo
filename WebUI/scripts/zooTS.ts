/// <reference path="./jquery.d.ts"/>
interface IAnimal {
  food: string;
  name: string;
  type: string;
}

var feed = function (animal: IAnimal) {
  alert("Just fed " + animal.food + " to " + animal.name + " the " + animal.type + ".");
}

var runMe = function () {
  var animal1: IAnimal = {
    name: "Ziggy",
    type: "Zebra",
    food: "leaves"
  };

  var animal2: IAnimal = {
    name: "Leo",
    type: "Lion",
    food: "steak"
  };

  feed(animal1);
  feed(animal2);
}

this.wireUpEvents(runMe);
