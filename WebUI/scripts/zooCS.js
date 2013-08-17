// Generated by CoffeeScript 1.6.3
(function() {
  var Animal, Cage, Tiger, Type, runMe,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Type = (function() {
    var Carnivore, Herbivore, Omnivore, _ref;

    function Type() {}

    _ref = [0, 1, 2], Herbivore = _ref[0], Carnivore = _ref[1], Omnivore = _ref[2];

    return Type;

  })();

  Animal = (function() {
    function Animal(name, type) {
      this.name = name;
      this.type = type;
      this.hasBeenFedToday = false;
    }

    Animal.prototype.feed = function() {
      var food;
      this.hasBeenFedToday = true;
      food = "";
      switch (this.type) {
        case Type.Carnivore:
          food = "meat";
          break;
        case Type.Herbivore:
          food = "veggies";
          break;
        case Type.Omnivore:
          food = "meat and veggies";
      }
      return alert("" + this.name + " is now eating some " + food);
    };

    return Animal;

  })();

  Tiger = (function(_super) {
    __extends(Tiger, _super);

    function Tiger(name) {
      this.name = name;
      Tiger.__super__.constructor.call(this, this.name, Type.Carnivore);
    }

    return Tiger;

  })(Animal);

  Cage = (function() {
    function Cage() {
      this.animals = [];
    }

    Cage.prototype.add = function(animal) {
      return this.animals.push(animal);
    };

    Cage.prototype.getFirst = function() {
      return this.animals[0];
    };

    Cage.prototype.getAll = function() {
      return this.animals;
    };

    return Cage;

  })();

  runMe = function() {
    var cage, firstAnimal;
    cage = new Cage();
    cage.add(new Tiger("Tony"));
    cage.add(new Tiger("Tigra"));
    firstAnimal = cage.getFirst();
    alert("The first animal in the cage is " + firstAnimal.name);
    return firstAnimal.feed();
  };

  $(document).ready(function() {
    return $('#btn-run').on('click', function() {
      return runMe();
    });
  });

}).call(this);
