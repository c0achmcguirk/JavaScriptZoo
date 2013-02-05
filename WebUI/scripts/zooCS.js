(function() {
  var Horse, horace;

  Horse = (function() {

    function Horse(numberOfLegs, name, voice) {
      this.numberOfLegs = numberOfLegs;
      this.name = name;
      this.voice = voice;
    }

    Horse.prototype.about = function() {
      return "This is a " + this.name + " with " + this.numberOfLegs + " legs, he says " + this.voice;
    };

    return Horse;

  })();

  horace = new Horse(4, "horsee", "neigh!");

  alert(horace.about());

}).call(this);
