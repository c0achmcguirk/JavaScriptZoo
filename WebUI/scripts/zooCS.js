(function() {
  var Horse, runMe, testMethod;

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

  testMethod = function(val1, val2) {
    if (val1 == null) {
      val1 = "one";
    }
    if (val2 == null) {
      val2 = "two";
    }
    return alert("" + val1 + " " + val2);
  };

  runMe = function() {
    var horace;
    horace = new Horse(4, "horse", "neigh!");
    alert(horace.about());
    return testMethod(null, null);
  };

  $(document).ready(function() {
    return $('#btn-run-coffee').on('click', function() {
      return runMe();
    });
  });

}).call(this);
