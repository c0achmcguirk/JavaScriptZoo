(function() {
  var Duck, Horse, Snake, getDescription, getDescription2, runMe;

  Horse = (function() {

    function Horse(name, numLegs, age, hasHorseshoes) {
      this.name = name;
      this.numLegs = numLegs;
      this.age = age;
      this.hasHorseshoes = hasHorseshoes;
    }

    return Horse;

  })();

  Duck = (function() {

    function Duck(name, numLegs, age) {
      this.name = name;
      this.numLegs = numLegs;
      this.age = age;
    }

    return Duck;

  })();

  Snake = (function() {

    function Snake(name, age) {
      this.name = name;
      this.age = age;
    }

    return Snake;

  })();

  runMe = function() {
    var donald, horace, sammy;
    horace = new Horse("Horace", 4, 8, true);
    donald = new Duck("Donald", 2, 1);
    sammy = new Snake("Sammy", 2);
    getDescription(horace);
    getDescription(donald);
    getDescription(sammy);
    getDescription2(horace);
    getDescription2(donald);
    return getDescription2(sammy);
  };

  getDescription = function(animal) {
    return alert("" + animal.name + " is " + animal.age + " years old.");
  };

  getDescription2 = function(animal) {
    return alert(("" + animal.name + " is " + animal.age + " years old and ") + ("has " + animal.numLegs + " legs. Horseshoes? " + animal.hasHorseshoes + "."));
  };

  this.wireUpEvents(runMe);

}).call(this);
