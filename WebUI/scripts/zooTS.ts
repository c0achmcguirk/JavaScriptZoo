interface IAnimalable {
  name: string;
  age: number;
}

interface ILeggable {
  numLegs: number;
}

interface IHorsable extends IAnimalable, ILeggable {
  hasHorseShoes: bool;
}

class Horse implements IHorsable {
  constructor(public name: string,
    public age: number,
    public numLegs: number,
    public hasHorseShoes: bool)
    { }
}

class Duck implements IAnimalable, ILeggable {
  constructor(public name: string, public age: number, public numLegs: number)
  { }
}

class Snake implements IAnimalable {
  constructor(public name: string, public age: number)
  { }
}

var runMe = function () {
  var horace = new Horse("Horace", 4, 8, true);
  var donald = new Duck("Donald", 2, 1);
  var sammy = new Snake("Sammy", 2);

  getDescription(horace);
  getDescription(donald);
  getDescription(sammy);

  getDescription2(horace);
  // getDescription2(donald);
  // getDescription2(sammy);
}

function getDescription(animal: IAnimalable) {
  alert(animal.name + " is " + animal.age + " years old.");
}

function getDescription2(animal: IHorsable) {
  alert(animal.name + " is " + animal.age + " years old and " +
    "has " + animal.numLegs + " legs. Horseshoes? " + animal.hasHorseShoes + ".");
}

this.wireUpEvents(runMe);