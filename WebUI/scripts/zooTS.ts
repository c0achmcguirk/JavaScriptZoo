/// <reference path="./jquery.d.ts"/>
/* NOTE: You can only compile this with TypeScript 0.9+ */
enum Type {
  Herbivore,
  Carnivore,
  Omnivore
}

class Animal {
  type            : Type;
  name            : string;
  hasBeenFedToday : boolean;

  constructor(name: string, type: Type) {
    this.name = name;
    this.type = type;
    this.hasBeenFedToday = false;
  }

  feed() {
    this.hasBeenFedToday = true;
    var food = "";
    switch(this.type) {
      case Type.Carnivore:
        food = "meat";
        break;
      case Type.Herbivore:
        food = "veggies";
        break;
      case Type.Omnivore:
        food = "meat and veggies";
        break;  
    }

    alert(this.name + " is now eating some " + food);
  }
}

class Tiger extends Animal {
  constructor(public name: string) {
    super(name, Type.Carnivore);
  }
}

class Cage<T> {
  private animals: Array<T>;

  constructor() {
    this.animals = [];
  }

  Add(animal: T) {
    this.animals.push(animal);
  }

  GetFirst(): T {
    return this.animals[0];
  }

  GetAll() : Array<T> {
    return this.animals;
  }
}

var runMe = function() {
  var cage = new Cage<Tiger>();
  cage.Add(new Tiger("Tony"));
  cage.Add(new Tiger("Tigra"));

  var firstAnimal = cage.GetFirst();
  alert("The first animal in the cage is " + firstAnimal.name);
  firstAnimal.feed();
};

$(document).ready(function() {
  $('#btn-run').on('click', function() {
    return runMe();
  });
});
