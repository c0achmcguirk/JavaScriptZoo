(function() {
  var Horse, runMe;

  Horse = (function() {

    function Horse(numberOfLegs, name, voice) {
      this.numberOfLegs = numberOfLegs;
      this.name = name;
      this.voice = voice;
      this.fullName = "the " + this.name + " is my full name";
    }

    Horse.prototype.about = function() {
      return "Hi, I'm a " + this.name + " with " + this.numberOfLegs + " legs and I say " + this.voice;
    };

    return Horse;

  })();

  runMe = function() {
    var horace;
    horace = new Horse(4, "horse", "neigh!");
    return alert(horace.about());
  };

  $(document).ready(function() {
    return $('#btn-run-coffee').on('click', function() {
      return runMe();
    });
  });

}).call(this);
