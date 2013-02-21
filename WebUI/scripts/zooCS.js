(function() {
  var feed, runMe;

  feed = function(animal) {
    return alert("Just fed " + animal.food + " to " + animal.name + " the " + animal.type + ".");
  };

  runMe = function() {
    var animal1, animal2;
    animal1 = {
      name: "Ziggy",
      type: "Zebra",
      food: "leaves"
    };
    animal2 = {
      name: "Leo",
      type: "Lion",
      food: "steak"
    };
    feed(animal1);
    return feed(animal2);
  };

  this.wireUpEvents(runMe);

}).call(this);
