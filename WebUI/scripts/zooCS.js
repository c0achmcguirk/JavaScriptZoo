(function() {
  var runMe;

  this.name = "Bill";

  runMe = function() {
    var giraffe;
    giraffe = {
      name: "Jeffrey",
      type: "Giraffe",
      numSpots: 10,
      eat: function() {
        alert("" + this.name + " the " + this.type + " (with " + this.numSpots + " spots) is eating");
        return setTimeout(function() {
          return alert(("" + this.name + " the " + this.type + " (with " + this.numSpots + " spots)") + " is still eating, 2 seconds later");
        }, 2000);
      }
    };
    return giraffe.eat();
  };

  this.wireUpEvents(runMe);

}).call(this);
